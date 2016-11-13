'use strict';

import firebase from 'firebase';
import moment from 'moment';

export const saveVote = (user, question, vote) => {
  var database = firebase.database();
  var stats = database.ref('/v0/live-statistics/' + question.id);

  stats.transaction((stat) => {
    console.log(user, stat);
    var simple = stat.simple
    vote ? simple.yes++ : simple.no++;

    var breakdown = stat.breakdown;
    if (!breakdown){
      breakdown = initialise();
    }

    generateClubBreakdown(user, vote, breakdown);
    generateAgeBreakdown(user, vote, breakdown);
    generateLocationBreakdown(user, vote, breakdown);

    if (user.remote.sex){
      vote ? breakdown.sex[user.remote.sex].yes++ : breakdown.sex[user.remote.sex].no++;
    }

    stat.breakdown = breakdown;
    return stat;
  });
};

const zeroValue = () => {
  return {yes: 0, no: 0};
};

const initialise = () => {
  return {
    club: {},
    age: {},
    sex: {
      Male: zeroValue(),
      Female: zeroValue(),
      Other: zeroValue()
    },
    location: {}
  };
};

const ageGroup = (age) => {
  if(age <= 20) {
    return '< 20';
  }

  if(age <= 30) {
    return '21 - 30';
  }

  if(age <= 40) {
    return '31 - 40';
  }

  if(age <= 50) {
    return '41 - 50';
  }

  if(age <= 60) {
    return '51 - 60';
  }

  return '60+';
};

const generateClubBreakdown = (user, vote, breakdown) => {
  if (!user.club || !user.club.shortName){
    return;
  }

  if (!breakdown.club[user.club.shortName]){
    breakdown.club[user.club.shortName] = zeroValue();
  }

  vote ? breakdown.club[user.club.shortName].yes++ : breakdown.club[user.club.shortName].no++;
};

const generateLocationBreakdown = (user, vote, breakdown) => {
  if (!user.remote.location){
    return;
  }

  if (!breakdown.location){
    breakdown.location = {[user.remote.location]: zeroValue()};
  }

  if (!breakdown.location[user.remote.location]){
    breakdown.location[user.remote.location] = zeroValue();
  }

  vote ? breakdown.location[user.remote.location].yes++ : breakdown.location[user.remote.location].no++;
};

const generateAgeBreakdown = (user, vote, breakdown) => {
  if (!user.remote.birthday){
    return;
  }

  var age = moment().diff(user.remote.birthday, 'years');
  console.log(user.remote.birthday, age);
  var group = ageGroup(age);

  if (!breakdown.age){
    breakdown.age = {[group]: zeroValue()};
  }

  if (!breakdown.age[group]){
    breakdown.age[group] = zeroValue();
  }

  vote ? breakdown.age[group].yes++ : breakdown.age[group].no++;
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
