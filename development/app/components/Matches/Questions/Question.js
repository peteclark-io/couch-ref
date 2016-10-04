'use strict'

import React from 'react';
import styles from './styles.css';

const Question = React.createClass({

   propTypes: {
      question: React.PropTypes.string
   },

   render: function() {
      return (
         <div>
            <h1>{this.props.question}</h1>
         </div>
      );
   }
});

export default Question;
