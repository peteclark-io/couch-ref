'use strict';

let admin = require('firebase-admin');
let co = require('co');

admin.initializeApp({
   credential: admin.credential.cert('./couchref-9962e-firebase-adminsdk-o2lct-36ef2f56f1.json'),
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

   const getUsersFromStdin = () => {

   };

   const answerQuestion = (question, users) => {
      var statistic = db.ref('/v0/live-statistics/' + question);
      statistic.transaction((stat) => {

      });
   };

   co(function *(){
      var qs = yield getQuestions();
      qs.map((q) => {
         console.log(q);
      });
   });
};
