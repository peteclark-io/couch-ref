'use strict';

const admin = require('firebase-admin');
const co = require('co');
const _ = require('lodash');
const magic = require('./magic');
const exec = require('child_process').exec;
const references = require('./references');

const getFromDb = (db) => {
   return new Promise((resolve, reject) => {
      db.once('value', (snapshot) => {
         resolve(snapshot.val());
      });
   });
};

const getMatch = (id, matches) => {
   return matches.filter((m) => {return m.id === id})[0];
};

const generateScore = (vote, verdict) => {
   return new Promise((resolve, reject) => {
      var res = vote ? '' : '=false';
      var cmd = 'scores --confidence "' + verdict.confidence + '" --result "' + verdict.percentage + '" --vote' + res
      exec(cmd, function(error, stdout, stderr) {
         var score = JSON.parse(stdout).score;
         resolve(score);
      });
   });
};

const saveScoreForQuestion = (db, question, score) => {
   db.ref(references.questions + '/' + question + '/referee_score').set(score);
};

const saveRefereeScores = (db, scores) => {
   var referees = Object.keys(scores);
   referees.map((ref) => {
      var matches = Object.keys(scores[ref]);
      matches.map((match) => {
         db.ref(references.referees + '/' + ref + '/recent_matches').once('value').then(snap => {
            var recents = snap.val();
            if (!snap.exists()){
               recents = [];
            }

            recents.unshift(match);
            recents = _.uniq(recents);

            if (recents.length > 5){
               recents.pop();
            }

            db.ref(references.referees + '/' + ref + '/recent_matches').set(recents);
         });

         db.ref(references.referees + '/' + ref + '/scores/' + match).set(scores[ref][match].score);
      });
   });
};

const saveRefereeTotals = (db) => {
   getFromDb(db.ref(references.referees)).then(val => {
      _.values(val).map(ref => {
         var total = _.sum(_.values(ref.scores));
         var score = 2000 + total;
         db.ref(references.referees + '/' + ref.id + '/total_score').set(score);
      });
   });
};

exports.command = 'referees';
exports.describe = '';
exports.handler = (argv) => {
   admin.initializeApp({
      credential: admin.credential.cert('./couchref-9962e-firebase-adminsdk.json'),
      databaseURL: "https://couchref-9962e.firebaseio.com"
   });

   //admin.database.enableLogging(true);
   var db = admin.database();

   co(function *(){
      var matches = yield getFromDb(db.ref('/v0/live-matches/'));
      var readyToScore = Object.keys(matches).map((uuid) => {
         return matches[uuid];
      }).filter((match) => {return match.full_time && match.referee && match.referee.trim() !== '';});

      var questionUuids = _.flatten(readyToScore.map((match) => {
         return match.questions.map((q) => {return q.id;});
      }));

      var matchScores = {};

      for (var i = 0 ; i < questionUuids.length ; i++){
         var questionDb = db.ref('/v0/live-questions/' + questionUuids[i]);
         var question = yield getFromDb(questionDb);

         if (!question || !question.decision || question.decision.trim() === ''){
            continue;
         }

         var stats = yield getFromDb(db.ref('/v0/live-statistics/' + questionUuids[i]));
         var match = getMatch(question.match, readyToScore);

         var verdict = magic.verdict(match, stats);

         var vote = question.decision === 'Yes' ? true : false;
         var score = yield generateScore(vote, verdict);

         saveScoreForQuestion(db, questionUuids[i], score);
         if (!matchScores[match.referee]){
            matchScores[match.referee] = {
               [match.id]: {id: match.id, score: 0}
            };
         }

         if (!matchScores[match.referee][match.id]){
            matchScores[match.referee][match.id] = {id: match.id, score: 0}
         }

         matchScores[match.referee][match.id].score = matchScores[match.referee][match.id].score + score;
      }

      saveRefereeScores(db, matchScores);
      saveRefereeTotals(db);
   }).catch((err) => {
      console.log(err);
   }).then(() => {
      console.log('k, thanks, bye.');
   });
};
