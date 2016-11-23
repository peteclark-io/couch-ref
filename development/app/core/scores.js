'use strict';

export const overallScore = (score) => {
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
      return 'It was close, but not a good decision.';
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
