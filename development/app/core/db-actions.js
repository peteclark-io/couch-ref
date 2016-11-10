'use strict';

import firebase from 'firebase';

export const saveVote = (user, question, vote) => {
  var database = firebase.database();
  var stats = database.ref('/v0/live-statistics/' + question.id);

  stats.transaction((stat) => {
    console.log(user, stat);
    var simple = stat.simple
    vote ? simple.yes++ : simple.no++;

    var breakdown = stat.breakdown;
    if (!breakdown){
      breakdown = {
        club: {
          [user.club.shortName]: {
            yes: 0,
            no: 0
          }
        }
      }
    }

    if (!breakdown.club[user.club.shortName]){
      breakdown.club[user.club.shortName] = {
        yes: 0,
        no: 0
      }
    }

    vote ? breakdown.club[user.club.shortName].yes++ : breakdown.club[user.club.shortName].no++;

    console.log(breakdown);
    stat.breakdown = breakdown;
    return stat;
  });
};

export const saveClub = (user, club) => {
  var database = firebase.database();
  var users = database.ref('/v0/users/' + user.remote.uid);

  users.transaction((u) => {
    console.log(user, u);
    if (!u){
      u = {};
    }
    u.club = club.name;
    return u;
  });
};

export const saveDateOfBirth = (user, birthday) => {
  var database = firebase.database();
  var users = database.ref('/v0/users/' + user.remote.uid);

  users.transaction((u) => {
    console.log(user, u);
    if (!u){
      u = {};
    }
    u.birthday = birthday.toISOString();
    return u;
  });
};

export const saveSex = (user, sex) => {
  var database = firebase.database();
  var users = database.ref('/v0/users/' + user.remote.uid);

  users.transaction((u) => {
    console.log(user, u);
    if (!u){
      u = {};
    }
    u.sex = sex;
    return u;
  });
};

export const saveLocation = (user, location) => {
  var database = firebase.database();
  var users = database.ref('/v0/users/' + user.remote.uid);

  users.transaction((u) => {
    console.log(user, u);
    if (!u){
      u = {};
    }
    u.location = location;
    return u;
  });
};
