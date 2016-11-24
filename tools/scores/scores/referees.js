'use strict';

const admin = require('firebase-admin');
const co = require('co');
const _ = require('lodash');
const magic = require('./magic');
const exec = require('child_process').exec;

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
         //console.log(cmd);
         var score = JSON.parse(stdout).score;
         resolve(score);
      });
   });
};

const saveRefereeScore = (db, referee, score) => {
   db.ref('/v0/referees/' + referee).transaction((ref) => {
      if (!ref) {
         return ref;
      }

      if (!ref.score) {
         ref.score = 2000;
      }

      ref.score = ref.score + score;
      return ref;
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

      for (var i = 0 ; i < questionUuids.length ; i++){
         var questionDb = db.ref('/v0/live-questions/' + questionUuids[i]);
         var question = yield getFromDb(questionDb);

         if (!question || !question.decision || question.decision.trim() === ''){
            //console.error('Skipping ' + questionUuids[i], question);
            continue;
         }

         var stats = yield getFromDb(db.ref('/v0/live-statistics/' + questionUuids[i]));
         var match = getMatch(question.match, readyToScore);

         var verdict = magic.verdict(match, stats);

         var vote = question.decision === 'Yes' ? true : false;
         var score = yield generateScore(vote, verdict);

         saveRefereeScore(db, match.referee, score);
      }
   }).catch((err) => {
      console.log(err);
   }).then(() => {
      console.log('k, thanks, bye.');
   });
};
