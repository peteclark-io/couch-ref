'use strict';

import React from 'react';
import Score from '../Score';
import moment from 'moment';
import renderer from 'react-test-renderer';

it('Renders ok.', () => {
   const match = {id: 'id', home: 'home', away: 'away', goalsHome: 0, goalsAway: 4, kickOff: moment('2011-01-04T20:00:00Z')}
   const rendered = renderer.create(
      <Score match={match} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});
