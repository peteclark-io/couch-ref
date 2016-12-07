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
   const question = {id: 'id', question: 'Is this a good test?', scored: false, time: 'Build Up'}
   const rendered = mount(
      <Question question={question} />
   );
   expect(rendered.html()).toMatchSnapshot();
});

it('Displays controversial question.', () => {
   const question = {id: 'id', question: 'Is this a good test?', controversial: true, scored: false, time: 'Build Up'}
   const rendered = mount(
      <Question question={question} />
   );
   expect(rendered.html()).toMatchSnapshot();
});

it('Displays question with referee decision.', () => {
   const question = {id: 'id', question: 'Is this a good test?', controversial: false, decision: 'Yes', scored: false, time: 'Build Up'}
   const rendered = mount(
      <Question question={question} />
   );
   expect(rendered.html()).toMatchSnapshot();
});

it('Displays question with description.', () => {
   const question = {id: 'id', question: 'Is this a good test?', controversial: true, description: 'I\'m really not sure anymore.', scored: false, time: 'Build Up'}
   const rendered = mount(
      <Question question={question} />
   );
   expect(rendered.html()).toMatchSnapshot();
});

it('Displays voting closed.', () => {
   const question = {id: 'id', question: 'Is this a good test?', controversial: true, description: 'I\'m really not sure anymore.', scored: true, time: 'Build Up'}
   const rendered = mount(
      <Question question={question} votedOn={false} />
   );
   expect(rendered.html()).toMatchSnapshot();
});
