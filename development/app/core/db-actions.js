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
