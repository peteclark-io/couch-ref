'use strict';

import moment from 'moment';

import {inspectFirebase, selectClub, setDateOfBirth, setSex, setLocation, setVotes, setScore} from '../ducks/user';
import {ready} from '../ducks/ready';

export default function Users(path, store, router){
   return {
      loadUser: (data) => {
         console.log('Loaded user data.', data);
         store.dispatch(ready());

         if (!data){
           router.push('/users/club');
           return;
         }

         var results = store.getState().clubs.filter((c) => {
            return c.name === data.club;
         });

         var userClub = results.length === 1 ? results[0] : undefined;
         if (userClub){
            store.dispatch(inspectFirebase({
               club: userClub,
            }));
            store.dispatch(selectClub(userClub));
         } else {
            router.push('/users/club');
            return;
         }

         if (data.birthday){
            var parsed = moment(data.birthday);
            if (parsed.isValid()){
              store.dispatch(inspectFirebase({
                remote: {
                  birthday: parsed
                }
              }));
              store.dispatch(setDateOfBirth(parsed));
            } else {
              router.push('/users/birthday');
              return;
            }
         } else {
            router.push('/users/birthday');
            return;
         }

         if (data.sex) {
            store.dispatch(inspectFirebase({
               remote: {
                  sex: data.sex
               }
            }));
            store.dispatch(setSex(data.sex));
         } else {
            router.push('/users/sex');
            return;
         }

         if (data.location) {
            store.dispatch(inspectFirebase({
               remote: {
                  location: data.location
               }
            }));
            store.dispatch(setLocation(data.location));
         } else {
            router.push('/users/location');
            return;
         }

         if (data.score){
            store.dispatch(setScore(data.score));
         }

         router.push(path);
      },
      loadVotes: (data) => {
         console.log('Loaded user votes.', data);
         var votes = {};
         Object.keys(data).map((uuid) => {
            Object.assign(votes, {
               [uuid]: {
                  result: data[uuid].answer === 'Yes' ? true : false,
                  answer: data[uuid].answer,
                  score: data[uuid].score
               }
            })
         });

         store.dispatch(setVotes(votes));
      }
   }
};
