'use strict';

import Cookies from 'js-cookie';

export default function run(){
  var cookieQ = Cookies.get('user.voted.questions')
  var clubCookie = Cookies.get('user.club')

  var cookies = {}
  if (clubCookie){
    var club = JSON.parse(clubCookie);
    cookies = Object.assign({}, cookies, {
      club: club
    });
  }

  if (cookieQ){
    var questions = JSON.parse(cookieQ);
    cookies = Object.assign({}, cookies, {
      votes: questions
    });
  }

  console.log('Cookies.', cookies);
  return cookies;
};

export function saveClub(club){
  Cookies.set('user.club', JSON.stringify(club))
};

export function saveVoteAsCookie(user, question, vote){
  var votes = Object.assign({}, user.votes, {
    [question.id]: {
      result: vote
    }
  });
  console.log('Cookie votes.', votes);
  Cookies.set('user.voted.questions', JSON.stringify(votes))
};
