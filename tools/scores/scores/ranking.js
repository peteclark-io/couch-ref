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

exports.command = 'ranking';
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
         usersDb[uid].uid = uid;
      });

      var vals = _.values(usersDb);
      var sorted = _.reverse(_.sortBy(vals, (user) => {return user.score ? user.score : 2000;}));

      sorted.map((user, i) => {
         var rank = i + 1;
         db.ref(references.users + '/' + user.uid).transaction((u) => {
            if (!u){
               return u;
            }

            u.movement = u.rank ? rank - u.rank : rank;
            u.rank = rank;
            return u;
         });
      });
   }).catch((err) => {
      console.log(err);
   }).then(() => {
      console.log('k, thanks, bye.');
   });
};
