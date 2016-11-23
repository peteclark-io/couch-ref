'use strict';

const admin = require('firebase-admin');
const co = require('co');
const _ = require('lodash');
const magic = require('./magic');
const exec = require('child_process').exec;

admin.initializeApp({
   credential: admin.credential.cert('./couchref-9962e-firebase-adminsdk.json'),
   databaseURL: "https://couchref-9962e.firebaseio.com"
});

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
      var cmd = 'scores --confidence "' + verdict.confidence + '" --result "' + verdict.percentage + '" --vote "' + vote + '"'
      exec(cmd, function(error, stdout, stderr) {
         var score = JSON.parse(stdout).score;
         resolve(score);
      });
   });
};

const saveScore = (db, questionDb, user) => {
   questionDb.transaction((q) => {
      if (!q){
         return q;
      }

      q.scored = true;
      return q;
   });

   db.ref('/v0/users/' + user.uid).transaction((u) => {
      if (!u) {
         return u;
      }

      var score = u.score;
      if (!score){
         score = 2000;
      }

      score = score + user.score;
      u.score = score;
      return u;
   });
};

exports.command = 'scores';
exports.describe = '';
exports.handler = (argv) => {
   //admin.database.enableLogging(true);
   var db = admin.database();

   co(function *(){
      var matches = yield getFromDb(db.ref('/v0/live-matches/'));
      var readyToScore = Object.keys(matches).map((uuid) => {
         return matches[uuid];
      }).filter((match) => {return match.full_time;});

      var questionUuids = _.flatten(readyToScore.map((match) => {
         return match.questions.map((q) => {return q.id;});
      }));

      var usersDb = yield getFromDb(db.ref('/v0/users'));
      var usersVotes = yield getFromDb(db.ref('/v0/users-votes'));

      var uidsForVoters = Object.keys(usersVotes);

      for (var i = 0 ; i < questionUuids.length ; i++){
         var questionDb = db.ref('/v0/live-questions/' + questionUuids[i]);
         var question = yield getFromDb(questionDb);
         if (!question.decision || question.decision.trim() === '' || question.scored){
            continue;
         }

         var stats = yield getFromDb(db.ref('/v0/live-statistics/' + questionUuids[i]));
         var verdict = magic.verdict(getMatch(question.match, readyToScore), stats);

         var users = uidsForVoters.map((uid) => {
            if (usersVotes[uid][questionUuids[i]]){
               return {
                  uid: uid,
                  user: usersDb[uid],
                  vote: usersVotes[uid][questionUuids[i]]
               };
            }
            return undefined;
         });

         for (var j = 0 ; j < users.length ; j++){
            var vote = users[j].vote === 'Yes' ? true : false;
            var score = yield generateScore(vote, verdict);
            users[j].score = score;
         }

         users.map((user) => {
            saveScore(db, questionDb, user);
         });
      }
   }).catch((err) => {
      console.log(err);
   }).then(() => {
      console.log('k, thanks, bye.');
   });
};
