'use strict';

const admin = require('firebase-admin');
const co = require('co');
const getStdin = require('get-stdin');

admin.initializeApp({
   credential: admin.credential.cert('./couchref-9962e-firebase-adminsdk.json'),
   databaseURL: "https://couchref-9962e.firebaseio.com"
});

exports.command = 'simulate <matchId>';
exports.describe = '';
exports.handler = (argv) => {
   //admin.database.enableLogging(true);
   var db = admin.database();
   var questions = db.ref('/v0/live-matches/' + argv.matchId + '/questions');

   const getQuestions = () => {
      return new Promise((resolve, reject) => {
         questions.once('value', (snapshot) => {
            resolve(snapshot.val());
         });
      });
   };

   const answer = (obj, prop, decision) => {
      if (!obj[prop]){
         obj[prop] = {yes: 0, no: 0};
      }

      decision ? obj[prop].yes++ : obj[prop].no++;
   }

   const answerQuestion = (question, users) => {
      console.log('hi');
      var statistic = db.ref('/v0/live-statistics/' + question.id);

      statistic.transaction((stat) => {
         if (!stat){
            console.log('Failed stat...', question, stat);
            return stat;
         }

         users.map((user) => {
            var decision = Math.random() >= 0.5;

            if (user.fan) {
               decision = Math.random() >= (1 - user.bias);
               decision = user.club === 'Arsenal' ? !decision : decision;
            }

            try {
               answer(stat, 'simple', decision);
               answer(stat.breakdown.age, user.age, decision);
               answer(stat.breakdown.sex, user.sex, decision);
               answer(stat.breakdown.location, user.location, decision);
               answer(stat.breakdown.club, user.club, decision);
            } catch(err){
               console.log(err);
            }
         });
         console.log('Done!', question.id);
         return stat;
      });
   };

   co(function *(){
      var qs = yield getQuestions();
      questions.off();

      var stdin = yield getStdin();
      try {
        var users = JSON.parse(stdin);
        qs.map((q) => {
          answerQuestion(q, users);
        });
      } catch(err){
        console.log(err);
      }
   });
};
