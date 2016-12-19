'use strict';

const admin = require('firebase-admin');
const co = require('co');
const _ = require('lodash');
const magic = require('./magic');
const references = require('./references');
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
         var score = JSON.parse(stdout).score;
         resolve(score);
      });
   });
};

const setToScored = (db, quuid) => {
   db.ref(references.questions + '/' + quuid + '/scored').set(true);
};

const saveScore = (db, quuid, user) => {
   db.ref(references.answers + '/' + user.uid + '/' + quuid).transaction((u) => {
      if (!u) {
         return u;
      }

      u.score = user.score;
      return u;
   });
};

exports.command = 'users';
exports.describe = '';
exports.handler = (argv) => {
   admin.initializeApp({
      credential: admin.credential.cert('./couchref-9962e-firebase-adminsdk.json'),
      databaseURL: "https://couchref-9962e.firebaseio.com"
   });

   //admin.database.enableLogging(true);
   var db = admin.database();

   co(function *(){
      var matches = yield getFromDb(db.ref(references.matches));
      var readyToScore = Object.keys(matches).map((uuid) => {
         return matches[uuid];
      }).filter((match) => {return match.full_time;});

      var questionUuids = _.flatten(readyToScore.map((match) => {
         return match.questions.map((q) => {return q.id;});
      }));

      var usersDb = yield getFromDb(db.ref(references.users));
      var usersVotes = yield getFromDb(db.ref(references.answers));

      var uidsForVoters = Object.keys(usersVotes);

      for (var i = 0 ; i < questionUuids.length ; i++){
         var questionDb = db.ref(references.questions + '/' + questionUuids[i]);
         var question = yield getFromDb(questionDb);

         setToScored(db, question.id);
         
         if (!question || !question.decision || question.decision.trim() === '' || question.scored){
            console.error('Skipping ' + questionUuids[i], question);
            continue;
         }

         var stats = yield getFromDb(db.ref(references.statistics + '/' + questionUuids[i]));
         var verdict = magic.verdict(getMatch(question.match, readyToScore), stats);

         var users = uidsForVoters.map((uid) => {
            if (usersVotes[uid][questionUuids[i]]){
               return {
                  uid: uid,
                  user: usersDb[uid],
                  answer: usersVotes[uid][questionUuids[i]].answer
               };
            }
            return undefined;
         });

         for (var j = 0 ; j < users.length ; j++){
            if (!users[j]){
               continue;
            }

            var vote = users[j].answer === 'Yes' ? true : false;
            var score = yield generateScore(vote, verdict);
            users[j].score = score;
         }

         users.map((user) => {
            if (!user) {
               console.log(user);
               return
            }
            saveScore(db, questionUuids[i], user);
         });
      }
   }).catch((err) => {
      console.log(err);
   }).then(() => {
      console.log('k, thanks, bye.');
   });
};
