'use strict';

const v = '/v0';
const config = {
   version: v,
   statistics: v + '/live-statistics',
   questions: v + '/live-questions',
   matches: v + '/live-matches',
   users: v + '/users',
   clubs: v + '/clubs',
   answers: v + '/user-answers',
   archiveMatches: v + '/archive-matches',
   archiveQuestions: v + '/archive-questions',
   archiveStatistics: v + '/archive-statistics'
};

module.exports = config;
