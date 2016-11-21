'use strict';

const BASIC = 'core/magic/BASIC';
const COMPLEX = 'core/magic/COMPLEX';
const populationRequirement = 100;

const basicVerdict = (match, results) => {
  if (!results.simple){
    return undefined;
  }

  return Object.assign({
    verdict: decideVerdict(perc.percentage),
    type: BASIC,
  }, producePercentage(results.simple));
};

export function verdict(match, results){
  console.log('Generating verdict.', match, results);
  if (!results.breakdown){
    return basicVerdict(match, results);
  }

  var neutral = {yes: results.simple.yes, no: results.simple.no};

  var home = undefined;
  if (results.breakdown.club[match.home]){
    home = {
      yes: results.breakdown.club[match.home].yes,
      no: results.breakdown.club[match.home].no
    };
    neutral.yes = neutral.yes - home.yes;
    neutral.no = neutral.no - home.no;
  }

  var away = undefined;
  if (results.breakdown.club[match.away]){
    away = {
      yes: results.breakdown.club[match.away].yes,
      no: results.breakdown.club[match.away].no
    };
    neutral.yes = neutral.yes - away.yes;
    neutral.no = neutral.no - away.no;
  }

  console.log(home, away, neutral);
  var homePerc = producePercentage(home);
  var awayPerc = producePercentage(away);
  var neutralPerc = producePercentage(neutral);

  var avg = produceAverage(homePerc.percentage, awayPerc.percentage, neutralPerc.percentage);
  var confidence = produceAverage(homePerc.confidence, awayPerc.confidence, neutralPerc.confidence);

  return {
    verdict: decideVerdict(avg),
    type: COMPLEX,
    percentage: avg,
    home: homePerc,
    away: awayPerc,
    neutral: neutralPerc,
    confidence: decideConfidence(confidence)
  };
};

const producePercentage = (simple = {yes: 0, no: 0}) => {
  if (simple.yes === 0 && simple.no === 0){
    return {
      percentage: 0.5,
      confidence: 0
    };
  }

  var total = simple.yes + simple.no;
  return {
    percentage: simple.yes > 0 ? simple.yes / total : 0,
    confidence: produceConfidence(total)
  };
};

const produceConfidence = (population) => {
  return population > populationRequirement ? 1 : population / populationRequirement;
}

const produceAverage = (home, away, neutral) => {
  return (home + away + neutral) / 3;
};

const decideVerdict = (percentage) => {
  if (percentage > 0.8){
    return 'Resounding Yes!';
  }

  if (percentage < 0.495 && percentage >= 0.47){
    return 'Close, but No!';
  }

  if (percentage < 0.47 && percentage >= 0.2){
    return 'No!';
  }

  if (percentage < 0.2){
    return 'Resounding No!';
  }

  if(percentage < 0.505 && percentage > 0.495){
    return 'Too Close to Call!';
  }

  if (percentage < 0.53 && percentage >= 0.505){
    return 'Close, but Yes!';
  }

  return 'Yes!';
};

const decideConfidence = (confidence) => {
  if (confidence === 1){
    return 'Very Confident';
  }

  if (confidence > 0.8){
    return 'Confident';
  }

  if (confidence > 0.4){
    return 'Fairly Confident';
  }

  if (confidence > 0.1){
    return 'Slightly Confident';
  }

  return 'Not Confident';
};
