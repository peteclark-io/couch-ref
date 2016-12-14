'use strict';

import React from 'react';
import KickOff from '../KickOff';
import moment from 'moment';
import renderer from 'react-test-renderer';

it('Renders ok.', () => {
   var date = moment('2011-01-04T20:00:00Z');
   const rendered = renderer.create(
      <KickOff kickOff={date} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});
