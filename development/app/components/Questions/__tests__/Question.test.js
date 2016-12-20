'use strict';

import React from 'react';
import {Question} from '../Question';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

it('Show loading screen when no question.', () => {
   const rendered = mount(
      <Question />
   );
   expect(rendered.find('.loading')).toHaveLength(1);
});

it('Displays vanilla question.', () => {
   const question = {id: 'id', question: 'Is this a good test?', time: 'Build Up'}
   const rendered = renderer.create(
      <Question question={question} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Displays controversial question.', () => {
   const question = {id: 'id', question: 'Is this a good test?', controversial: true, time: 'Build Up'}
   const rendered = renderer.create(
      <Question question={question} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Displays question with referee decision.', () => {
   const question = {id: 'id', question: 'Is this a good test?', controversial: false, votingClosed: false, decision: 'Yes', time: 'Build Up'}
   const rendered = renderer.create(
      <Question question={question} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

it('Displays question with description.', () => {
   const question = {id: 'id', question: 'Is this a good test?', controversial: true, description: 'I\'m really not sure anymore.', votingClosed: false, scored: false, time: 'Build Up'}
   const rendered = renderer.create(
      <Question question={question} />
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});

/*it('Should not show buttons, as voting is closed.', () => {
   const question = {id: 'id', question: 'Is this a good test?', votingClosed: true, controversial: false, description: 'I\'m really not sure anymore.', scored: false, time: 'Build Up'}
   const rendered = mount(
      <Question question={question} votedOn={false} />,
      {context: {store: {}}}
   );
   expect(rendered.toJSON()).toMatchSnapshot();
});*/
