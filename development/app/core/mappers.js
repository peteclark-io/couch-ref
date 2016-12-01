'use strict';

import moment from 'frozen-moment';
import _ from 'lodash';

export const createMatch = (value) => {
   return {
      id: value.id,
      kickOff: moment(value.kick_off).freeze(),
      home: value.home,
      away: value.away,
      goalsHome: value.home_score,
      goalsAway: value.away_score,
      fullTime: value.full_time,
      referee: value.referee,
      homeLineup: value.home_lineup,
      homeSubs: value.home_subs,
      awayLineup: value.away_lineup,
      awaySubs: value.away_subs,
      questions: value.questions ? value.questions : []
   };
}

export const createQuestion = (value) => {
   return {
      id: value.id,
      time: value.time,
      asked: value.asked,
      question: value.question,
      description: value.description,
      decision: value.decision,
      controversial: value.controversial,
      match: value.match,
      scored: value.scored,
      refereeScore: value.referee_score
   };
}

export const createReferee = (value) => {
   return {
      id: value.id,
      name: value.name,
      debut: moment(value.debut).freeze(),
      movement: value.movement ? value.movement : 0,
      appearances: refereeAppearances(value),
      scores: value.scores,
      totalScore: refereeTotal(value)
   };
}

const refereeAppearances = (value) => {
   if (!value.scores){
      return 0;
   }
   return Object.keys(value.scores).length;
};

const refereeTotal = (value) => {
   if (!value.scores){
      return 2000;
   }

   var entries = Object.keys(value.scores);
   return 2000 + _.sum(entries.map((e) => {
      return value.scores[e];
   }));
};

export const createStatistic = (value) => {
   return {
      id: value.id,
      simple: value.simple,
      breakdown: value.breakdown
   };
}
