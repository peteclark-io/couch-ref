'use strict';

import moment from 'moment';

export const createMatch = (value) => {
  return {
    id: value.id,
    kickOff: moment(value.kick_off),
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
    scored: value.scored
  };
}

export const createStatistic = (value) => {
  return {
    id: value.id,
    simple: value.simple,
    breakdown: value.breakdown
  };
}
