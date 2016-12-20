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

exports.command = 'user <name>';
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
      var regex = new RegExp('.*' + argv.name + '.*', 'i');
      var matches = _.values(usersDb).map(user => {
         return regex.test(user.full_name) ? user : undefined;
      }).filter(user => user).map(user => {
         return {uid: user.uid, email: user.email, displayName: user.full_name};
      });

      if (matches.length > 0){
         console.log(JSON.stringify(matches));
         return;
      }

      matches = _.values(usersDb).map(user => {
         return regex.test(user.club) ? user : undefined;
      }).filter(user => user).map(user => {
         return {uid: user.uid, email: user.email, displayName: user.full_name};
      });

      console.log(JSON.stringify(matches));

   }).catch((err) => {
      console.log(err);
   }).then(() => {
      console.log('k, thanks, bye.');
   });
};
