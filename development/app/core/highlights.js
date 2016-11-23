'use strict';

import countries from './countries';
import _ from 'lodash';

const genders = ['Male', 'Female'];
const ageGroups = ['< 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '60+'];
const populationRequirement = 10;

export function highlight(clubs, age, sex, location, club){
   var ageH = ageHighlights(age);
   var sexH = sexHighlights(sex);
   var countryH = countryHighlights(location);
   var clubH = clubHighlights(clubs, club);

   if (ageH.length === 0 && sexH.length === 0 && countryH.length === 0 && clubH.length === 0){
      return
   }

   var sorted = selectHighlight(clubH, ageH, sexH, countryH);

   var top = sorted[0];
   var bottom = sorted[sorted.length-1];

   createHeadline(top);
   createHeadline(bottom);

   if (top.headline > bottom.headline){
      return Object.assign(top, {
         blurb: createBlurb(top)
      });
   }

   return Object.assign(bottom, {
      blurb: createBlurb(bottom)
   });
};

const selectHighlight = (clubH, ageH, sexH, countryH) => {
   var union = _.sortBy(_.union(clubH, ageH, sexH, countryH), ['priority']).reverse();
   var priority = union[0].priority;
   var found = union.filter((p) => {return p.priority === priority;})
   return _.sortBy(found, ['percentage']);
};

const createHeadline = (highlight) => {
   var perc = highlight.percentage * 100;
   var yes = true;

   if (highlight.percentage < 0.1){
      perc = (1 - highlight.percentage) * 100;
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
      case 'club':
         return 'of users who support ' + highlight.group + ' voted ' + (highlight.yes ? 'Yes' : 'No') + '!';
   }
   return '';
};

const clubHighlights = (clubs, clubD) => {
   var perc = clubs.map((club) => {
      if (!clubD[club]){
         return undefined;
      }

      var total = clubD[club].yes + clubD[club].no;
      return {
         priority: 4,
         type: 'club',
         group: club,
         percentage: clubD[club].yes / total
      };
   }).filter((r) => {
      if (r && (r.percentage > 0.9 || r.percentage < 0.1)){
         return r;
      }
   });

   return perc;
};

const countryHighlights = (location) => {
   var perc = countries.map((country) => {
      if (!location[country]){
         return undefined;
      }

      var total = location[country].yes + location[country].no;
      return {
         priority: 3,
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
         priority: 1,
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
         priority: 2,
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
