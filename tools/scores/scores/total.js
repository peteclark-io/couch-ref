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

exports.command = 'total';
exports.describe = '';
exports.handler = (argv) => {
   admin.initializeApp({
      credential: admin.credential.cert('./couchref-9962e-firebase-adminsdk.json'),
      databaseURL: "https://couchref-9962e.firebaseio.com"
   });

   //admin.database.enableLogging(true);
   var db = admin.database();

   co(function *(){
      var usersDb = yield getFromDb(db.ref(references.users));
      Object.keys(usersDb).map((uid) => {
         var score = 2000;
         var count = 0;
         var best = {question: '', score: -1000};
         var worst = {question: '', score: 1000};

         getFromDb(db.ref(references.answers + '/' + uid + '/')).then((answers) => {
            if (!answers){
               return;
            }

            Object.keys(answers).map((quuid) => {
               score = score + answers[quuid].score;
               count++;
               best = answers[quuid].score > best.score ? {question: quuid, score: answers[quuid].score} : best;
               worst = answers[quuid].score < worst.score ? {question: quuid, score: answers[quuid].score} : worst;
            });

            db.ref(references.users + '/' + uid + '/').transaction((u) => {
               if (!u){
                  return u;
               }

               u.score = score;
               u.answered = count;
               u.best = best;
               u.worst = worst;
               return u;
            });
         });
      });
   }).catch((err) => {
      console.log(err);
   }).then(() => {
      console.log('k, thanks, bye.');
   });
};
