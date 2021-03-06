'use strict';

import moment from 'moment';
import _ from 'lodash';

import {createUser, createVotes} from './mappers';
import {inspectFirebase, selectClub, setDateOfBirth, setSex, setLocation, setVotes, addRemoteFields} from '../ducks/user';

import leagues from './leagues';
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

         store.dispatch(addRemoteFields(createUser(data)));

         var userClub = _.find(store.getState().clubs, ['name', data.club]);
         userClub = !userClub ? _.find(leagues, ['name', data.club]) : userClub;

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
            var parsed = moment(data.birthday).freeze();
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

         console.timeEnd('load-data');
         router.push(path);
      },
      loadVotes: (data) => {
         console.log('Loaded user votes.', data);
         store.dispatch(setVotes(createVotes(data)));
      }
   }
};
