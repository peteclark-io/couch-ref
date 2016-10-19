'use strict';

import Cookies from 'js-cookie';

export default function run(){
  var cookieQ = Cookies.get('user.voted.questions')
  if (!cookieQ){
    return {
      votes: []
    };
  }

  var questions = JSON.parse(cookieQ);
  console.log(questions);
  return {
    votes: questions
  };
};
