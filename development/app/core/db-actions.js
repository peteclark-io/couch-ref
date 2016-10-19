'use strict';

import firebase from 'firebase';

export const saveVote = (question, vote) => {
  var database = firebase.database();
  var stats = database.ref('/v0/live-statistics/' + question.id + '/simple');

  stats.transaction((simple) => {
    console.log(simple);
    vote ? simple.yes++ : simple.no++;
    return simple;
  });
};
