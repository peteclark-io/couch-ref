'use strict';

const admin = require('firebase-admin');
const co = require('co');
const _ = require('lodash');
const references = require('./references');

const getFromDb = (db) => {
   return new Promise((resolve, reject) => {
      db.once('value', (snapshot) => {
         resolve(snapshot.val());
      });
   });
};

exports.command = 'archive';
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
      var keyed = _.values(matches);
      keyed.map(m => {
         db.ref(references.archiveMatches + '/' + m.id).set(m);
      });

      var stats = yield getFromDb(db.ref(references.statistics));
      var keyedS = _.values(stats);
      keyedS.map(m => {
         db.ref(references.archiveStatistics + '/' + m.id).set(m);
      });

      var questions = yield getFromDb(db.ref(references.questions));
      var keyedQ = _.values(questions);
      keyedQ.map(m => {
         db.ref(references.archiveQuestions + '/' + m.id).set(m);
      });

   }).catch((err) => {
      console.log(err);
   }).then(() => {
      console.log('k, thanks, bye.');
   });
};
