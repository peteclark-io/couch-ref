'use strict';

import React from 'react';
import Score from '../../components/UserScore/Score';
import Ranking from '../../components/UserScore/Ranking';
import RefereeStats from '../../components/UserScore/RefereeStats';

const UserScorePage = React.createClass({

   render: function() {
      return (
         <div>
            <Score />
            <Ranking />
            {/*<RefereeStats />*/}
         </div>
      );
   }
});

export default UserScorePage;
