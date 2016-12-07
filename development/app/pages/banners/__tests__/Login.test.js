'use strict';

import React from 'react';
import {Login} from '../Login';
import {mount, shallow} from 'enzyme';
import renderer from 'react-test-renderer';

const firebase = (checker) => {
   return {
      auth: () => {
         return {signInWithRedirect: (provider) => {checker(provider)}}
      }
   };
}

test('Login snapshot', () => {
   const rendered = renderer.create(
      <Login firebase={firebase((p) => {})} authenticated={false} />
   );

   let tree = rendered.toJSON();
   expect(tree).toMatchSnapshot();
});

it('Can login via google', () => {
   const check = (provider) => {
      expect(provider.providerId).toEqual('google.com');
   };

   const rendered = shallow(
      <Login firebase={firebase(check)} authenticated={false} />
   );

   rendered.find('#google').simulate('click')
});

it('Can login via facebook', () => {
   const check = (provider) => {
      expect(provider.providerId).toEqual('facebook.com');
   };

   const rendered = shallow(
      <Login firebase={firebase(check)} authenticated={false} />
   );

   rendered.find('#facebook').simulate('click')
});

it('Can login via twitter', () => {
   const check = (provider) => {
      expect(provider.providerId).toEqual('twitter.com');
   };

   const rendered = shallow(
      <Login firebase={firebase(check)} authenticated={false} />
   );

   rendered.find('#twitter').simulate('click')
});

it('Redirects if already authenticated', () => {
   var routed = false;
   const router = {
      push: (uri) => {
         expect(uri).toEqual('/');
         routed = true;
      }
   };

   const rendered = mount(
      <Login firebase={firebase((p) => {})} authenticated={true} />,
      {context: {router: router}}
   );

   expect(routed).toBeTruthy();
});
