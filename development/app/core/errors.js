'use strict';

import firebase from 'firebase';

export const error = (error) => {
   var database = firebase.database();
   var stats = database.ref('/v0/errors/' + question.id);
};
