'use strict';

import React from 'react';
import {ClubCrests} from '../ClubCrests';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

it('Shows loading screen when no data.', () => {
   const rendered = shallow(
      <ClubCrests />
   );
   expect(rendered.find('.loading')).toHaveLength(1);
});

it('Renders ok with clubs.', () => {
   const clubs = [{url: 'url', name: 'Arsenal'}];
   const user = {name: 'pedro'};

   var routed = false;
   const router = {push: (path) => {
      routed = true;
      expect(path).toEqual('/users/birthday');
   }}

   var clicked = false;
   const rendered = mount(
      <ClubCrests location={{query: {edited: false}}} clubs={clubs} user={user} selectClub={(user, club) => {
         clicked = true;
         expect(user.name).toEqual('pedro');
         expect(club.name).toEqual('Arsenal');
         expect(club.url).toEqual('url');
      }} />,
      {context: {router: router}}
   );

   expect(rendered.html()).toMatchSnapshot();
   rendered.find('img[alt="Arsenal"]').simulate('click');

   expect(routed).toBeTruthy();
   expect(clicked).toBeTruthy();
});

it('Should return to the edit page if edited.', () => {
   const clubs = [{url: 'url', name: 'Arsenal'}];
   const user = {name: 'pedro'};

   var routed = false;
   const router = {push: (path) => {
      routed = true;
      expect(path).toEqual('/users/edit');
   }}

   var clicked = false;
   const rendered = mount(
      <ClubCrests location={{query: {edited: true}}} clubs={clubs} user={user} selectClub={(user, club) => {
         clicked = true;
         expect(user.name).toEqual('pedro');
         expect(club.name).toEqual('Arsenal');
         expect(club.url).toEqual('url');
      }} />,
      {context: {router: router}}
   );

   expect(rendered.html()).toMatchSnapshot();
   rendered.find('img[alt="Arsenal"]').simulate('click');

   expect(routed).toBeTruthy();
   expect(clicked).toBeTruthy();
});
