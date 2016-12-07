'use strict'

import React from 'react';

import QuestionResults from '../../components/Stats/QuestionResults';

const StatsPage = React.createClass({

   render: function() {
      return (
         <QuestionResults id={this.props.params.questionId} />
      );
   }
});

export default StatsPage;
