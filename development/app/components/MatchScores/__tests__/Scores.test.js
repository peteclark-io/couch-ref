'use strict';

import React from 'react';
import Scores from '../Scores';
import moment from 'moment';
import renderer from 'react-test-renderer';

it('Renders two upcoming fixtures.', () => {
   const match =  {id: 'id',  home: 'home',  away: 'away',  goalsHome: 0, goalsAway: 4, kickOff: moment('2020-01-04T20:00:00Z'), televised: true, live: true}
   const match2 = {id: 'id2', home: 'home2', away: 'away2', goalsHome: 1, goalsAway: 3, kickOff: moment('2021-01-04T20:00:00Z'), televised: true, live: true}

   const rendered = renderer.create(
      <Scores matches={[match, match2]} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Renders only televised fixtures.', () => {
   const match =  {id: 'id',  home: 'home',  away: 'away',  goalsHome: 0, goalsAway: 4, kickOff: moment('2020-01-04T20:00:00Z'), televised: true, live: true}
   const match2 = {id: 'id2', home: 'home2', away: 'away2', goalsHome: 1, goalsAway: 3, kickOff: moment('2021-01-04T20:00:00Z'), televised: false, live: true}

   const rendered = renderer.create(
      <Scores matches={[match, match2]} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Disables links if the match is not live.', () => {
   const match =  {id: 'id',  home: 'home',  away: 'away',  goalsHome: 0, goalsAway: 4, kickOff: moment('2020-01-04T20:00:00Z'), televised: true, live: false}
   const match2 = {id: 'id2', home: 'home2', away: 'away2', goalsHome: 1, goalsAway: 3, kickOff: moment('2021-01-04T20:00:00Z'), televised: true, live: true}

   const rendered = renderer.create(
      <Scores matches={[match, match2]} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Renders one upcoming fixture, removes other.', () => {
   const match =  {id: 'id',  home: 'home',  away: 'away',  goalsHome: 0, goalsAway: 4, kickOff: moment('2016-01-04T20:00:00Z'), televised: true, live: true}
   const match2 = {id: 'id2', home: 'home2', away: 'away2', goalsHome: 1, goalsAway: 3, kickOff: moment('2021-01-04T20:00:00Z'), televised: true, live: true}

   const rendered = renderer.create(
      <Scores matches={[match, match2]} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Renders no fixtures if they\'re old.', () => {
   const match =  {id: 'id',  home: 'home',  away: 'away',  goalsHome: 0, goalsAway: 4, kickOff: moment('2014-01-04T20:00:00Z'), televised: true, live: true}
   const match2 = {id: 'id2', home: 'home2', away: 'away2', goalsHome: 1, goalsAway: 3, kickOff: moment('2014-02-04T20:00:00Z'), televised: true, live: true}

   const rendered = renderer.create(
      <Scores matches={[match, match2]} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});
