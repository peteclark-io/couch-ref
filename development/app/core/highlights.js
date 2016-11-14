'use strict';

import countries from './countries';
import _ from 'lodash';

const genders = ['Male', 'Female'];
const ageGroups = ['< 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '60+'];
const populationRequirement = 10;

export function highlight(age, sex, location){
   var ageH = ageHighlights(age);
   var sexH = sexHighlights(sex);
   var countryH = countryHighlights(location);

   if (ageH.length === 0 && sexH.length === 0 && countryH.length === 0){
      return
   }

   var sorted = _.sortBy(_.union(ageH, sexH, countryH), ['percentage', 'type']);

   var top = sorted[0];
   var bottom = sorted[sorted.length-1];

   createHeadline(top);
   createHeadline(bottom);

   if (top.percentage > (1-bottom.percentage)){
      return Object.assign(top, {
         blurb: createBlurb(top)
      });
   }

   return Object.assign(bottom, {
      blurb: createBlurb(bottom)
   });
}

const createHeadline = (highlight) => {
   var perc = highlight.percentage * 100;
   var yes = true;

   if (highlight.percentage < 0.1){
      perc = 1 - highlight.percentage * 100;
      yes = false;
   }

   highlight.yes = yes;
   highlight.headline = perc;
}

const createBlurb = (highlight) => {
   switch (highlight.type) {
      case 'age':
         return 'of users aged ' + highlight.group + ' voted ' + (highlight.yes ? 'Yes' : 'No') + '!';
      case 'sex':
         return 'of ' + highlight.group + ' users voted ' + (highlight.yes ? 'Yes' : 'No') + '!';
      case 'location':
         return 'of users from ' + highlight.group + ' voted ' + (highlight.yes ? 'Yes' : 'No') + '!';
   }
   return '';
};

const countryHighlights = (location) => {
   var perc = countries.map((country) => {
      if (!location[country]){
         return undefined;
      }

      var total = location[country].yes + location[country].no;
      return {
         type: 'location',
         group: country,
         percentage: location[country].yes / total
      };
   }).filter((r) => {
      if (r && (r.percentage > 0.9 || r.percentage < 0.1)){
         return r;
      }
   });

   return perc;
};

const sexHighlights = (sex) => {
   var perc = genders.map((gender) => {
      if (!sex[gender]){
         return undefined;
      }

      var total = sex[gender].yes + sex[gender].no;
      return {
         type: 'sex',
         group: gender,
         percentage: sex[gender].yes / total
      };
   }).filter((r) => {
      if (r && (r.percentage > 0.9 || r.percentage < 0.1)){
         return r;
      }
   });

   return perc;
};

const ageHighlights = (age) => {
   var perc = ageGroups.map((group) => {
      if (!age[group]){
         return undefined;
      }

      var total = age[group].yes + age[group].no;
      return {
         type: 'age',
         group: group,
         percentage: age[group].yes / total
      };
   }).filter((r) => {
      if (r && (r.percentage > 0.9 || r.percentage < 0.1)){
         return r;
      }
   });

   return perc;
};
