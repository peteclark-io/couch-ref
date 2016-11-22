'use strict';

const admin = require('firebase-admin');
const co = require('co');
const getStdin = require('get-stdin');

admin.initializeApp({
   credential: admin.credential.cert('./couchref-9962e-firebase-adminsdk.json'),
   databaseURL: "https://couchref-9962e.firebaseio.com"
});

exports.command = 'scores <matchId>';
exports.describe = '';
exports.handler = (argv) => {
   //admin.database.enableLogging(true);
   var db = admin.database();
   var questions = db.ref('/v0/live-matches/' + argv.matchId + '/questions');
   

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
