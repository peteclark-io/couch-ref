'use strict';

import React from 'react';
import Score from '../../components/UserScore/Score';
import RefereeCareer from '../../components/UserScore/RefereeCareer';
import TopAnswer from '../../components/UserScore/TopAnswer';

const UserScorePage = React.createClass({

   render: function() {
      return (
         <div>
            <Score />
            <RefereeCareer />
         </div>
      );
   }
});

export default UserScorePage;
