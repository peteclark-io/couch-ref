'use strict';

import React from 'react';
import Score from '../../components/UserScore/Score';
import Answered from '../../components/UserScore/Answered';

const UserScorePage = React.createClass({

   render: function() {
      return (
         <div>
            <Score />
            <Answered />
         </div>
      );
   }
});

export default UserScorePage;
