'use strict';

import React from 'react';
import {component} from '../Login.js';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

const firebase = (checker) => {
   return {
      auth: () => {
         return {signInWithRedirect: (provider) => {checker(provider)}}
      }
   };
}

test('Login snapshot', () => {
   const Login = component();
   const rendered = renderer.create(
      <Login firebase={firebase((p) => {})} authenticated={false} />
   );

   let tree = rendered.toJSON();
   expect(tree).toMatchSnapshot();
});

it('Can login via google', () => {
   const Login = component();

   const check = (provider) => {
      expect(provider.providerId).toEqual('google.com');
   };

   const rendered = shallow(
      <Login firebase={firebase(check)} authenticated={false} />
   );

   rendered.find('#google').simulate('click')
});

it('Can login via facebook', () => {
   const Login = component();

   const check = (provider) => {
      expect(provider.providerId).toEqual('facebook.com');
   };

   const rendered = shallow(
      <Login firebase={firebase(check)} authenticated={false} />
   );

   rendered.find('#facebook').simulate('click')
});

it('Can login via twitter', () => {
   const Login = component();

   const check = (provider) => {
      expect(provider.providerId).toEqual('twitter.com');
   };

   const rendered = shallow(
      <Login firebase={firebase(check)} authenticated={false} />
   );

   rendered.find('#twitter').simulate('click')
});
