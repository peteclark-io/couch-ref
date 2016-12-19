'use strict';

import React from 'react';
import Ranking from '../../components/UserScore/Ranking';

const UserScorePage = React.createClass({

   render: function() {
      return (
         <div>
            <Ranking />
         </div>
      );
   }
});

export default UserScorePage;
