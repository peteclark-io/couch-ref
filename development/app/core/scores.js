'use strict';

export const overallScore = (answered, score) => {
   if (answered > 10000 && score > 5000){
      return 'Legendary Referee';
   }

   if (answered > 4000 && score > 4000) {
      return 'World Class Referee';
   }

   if (answered > 2000 && score > 3000) {
      return 'International Referee';
   }

   if (score > 3000){
      return 'Excellent Referee';
   }

   if (answered > 500 && score > 2000) {
      return 'FA Referee';
   }

   if (answered > 500 && score > 1500) {
      return 'Semi-Pro Referee';
   }

   if (answered > 500 && score > 1000) {
      return 'Amateur Referee';
   }

   if (answered > 500) {
      return 'Schoolyard Referee';
   }

   if (answered > 200 && score > 2500) {
      return 'Promising Referee';
   }

   if (answered > 200) {
      return 'Junior Referee';
   }

   return 'Fledgling Referee';
};

export const questionScore = (score) => {
   if(score > 0 && score < 1) {
      return 'Just about the right decision.';
   }

   if(score >= 1 && score < 3) {
      return 'Good decision!';
   }

   if(score >= 3 && score < 10) {
      return 'Excellent decision!';
   }

   if(score <= 0 && score > -1) {
      return 'Close, but not a good decision.';
   }

   if(score <= -1 && score > -2.5) {
      return 'Poor decision.';
   }

   if(score <= -2.5 && score > -4) {
      return 'Awful decision.';
   }

   if(score <= -4 && score > -6) {
      return 'Appalling decision.';
   }

   if(score <= -6) {
      return 'You\'ve had a nightmare.';
   }

   if(score <= -10) {
      return 'Should you even be a ref?';
   }
};

export const matchScore = (score) => {
   if(score > 0 && score < 1) {
      return 'Decent.';
   }

   if(score >= 1 && score < 3) {
      return 'Some Great Decisions!';
   }

   if(score >= 3 && score < 10) {
      return 'Superb!';
   }

   if(score <= 0 && score > -1) {
      return 'Not Bad.';
   }

   if(score <= -1 && score > -2.5) {
      return 'Room For Improvement.';
   }

   if(score <= -2.5 && score > -4) {
      return 'Poor.';
   }

   if(score <= -4 && score > -6) {
      return 'Terrible.';
   }

   if(score <= -6) {
      return 'A Nightmare.';
   }

   if(score <= -10) {
      return 'Should you even be a ref?';
   }
};
