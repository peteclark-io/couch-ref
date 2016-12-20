'use strict'

import React from 'react';

import LiveQuestionResults from '../../components/Stats/LiveQuestionResults';

const StatsPage = React.createClass({

   render: function() {
      return (
         <LiveQuestionResults id={this.props.params.questionId} />
      );
   }
});

export default StatsPage;
