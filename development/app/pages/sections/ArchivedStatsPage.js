'use strict'

import React from 'react';

import ArchiveQuestionResults from '../../components/Stats/ArchiveQuestionResults';

const ArchivedStatsPage = React.createClass({

   render: function() {
      return (
         <ArchiveQuestionResults id={this.props.params.questionId} />
      );
   }
});

export default ArchivedStatsPage;
