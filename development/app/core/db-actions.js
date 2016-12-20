'use strict';

import firebase from 'firebase';
import moment from 'frozen-moment';
import references from './references';

export const saveVote = (user, question, vote) => {
   var database = firebase.database();
   var stats = database.ref(references.statistics + '/' + question.id);

   stats.transaction((stat) => {
      var simple = stat.simple
      vote ? simple.yes++ : simple.no++;

      var breakdown = stat.breakdown;
      if (!breakdown){
         breakdown = initialise();
      }

      generateClubBreakdown(user, vote, breakdown);
      generateAgeBreakdown(user, vote, breakdown);
      generateLocationBreakdown(user, vote, breakdown);

      if (user.sex){
         vote ? breakdown.sex[user.sex].yes++ : breakdown.sex[user.sex].no++;
      }

      stat.breakdown = breakdown;
      return stat;
   });

   if (!user.remote.uid){
      return;
   }

   var usersVotes = database.ref(references.answers + '/' + user.remote.uid);
   usersVotes.transaction((userVote) => {
      if (!userVote){
         userVote = {};
      }

      userVote[question.id] = {
         answer: vote ? 'Yes' : 'No',
         score: 0
      };
      return userVote;
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
   if (!user.location){
      return;
   }

   if (!breakdown.location){
      breakdown.location = {[user.location]: zeroValue()};
   }

   if (!breakdown.location[user.location]){
      breakdown.location[user.location] = zeroValue();
   }

   vote ? breakdown.location[user.location].yes++ : breakdown.location[user.location].no++;
};

const generateAgeBreakdown = (user, vote, breakdown) => {
   if (!user.birthday){
      return;
   }

   var age = moment().diff(user.birthday, 'years');
   var group = ageGroup(age);

   if (!breakdown.age){
      breakdown.age = {[group]: zeroValue()};
   }

   if (!breakdown.age[group]){
      breakdown.age[group] = zeroValue();
   }

   vote ? breakdown.age[group].yes++ : breakdown.age[group].no++;
};

export const saveUserData = (user) => {
   var database = firebase.database();
   database.ref(references.users + '/' + user.uid + '/full_name').set(user.displayName);
   database.ref(references.users + '/' + user.uid + '/uid').set(user.uid);
   database.ref(references.users + '/' + user.uid + '/email').set(user.email);
};

export const saveClub = (user, club) => {
   var database = firebase.database();
   database.ref(references.users + '/' + user.remote.uid + '/club').set(club.name);
};

export const saveDateOfBirth = (user, birthday) => {
   var database = firebase.database();
   var users = database.ref(references.users + '/' + user.remote.uid);
   database.ref(references.users + '/' + user.remote.uid + '/birthday').set(birthday.toISOString());
};

export const saveSex = (user, sex) => {
   var database = firebase.database();
   var users = database.ref(references.users + '/' + user.remote.uid);
   database.ref(references.users + '/' + user.remote.uid + '/sex').set(sex);
};

export const saveLocation = (user, location) => {
   var database = firebase.database();
   database.ref(references.users + '/' + user.remote.uid + '/location').set(location);
};
