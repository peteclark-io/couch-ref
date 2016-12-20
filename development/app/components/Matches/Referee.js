'use strict'

import React from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import styles from './styles.css';

export const Referee = React.createClass({

   propTypes: {
      referee: React.PropTypes.object
   },

   render: function() {
      if (!this.props.referee || !this.props.referee.name.display){
         return null;
      }

      return (
         <h4 className={styles.referee}>Referee: {this.props.referee.name.display}</h4>
      );
   }
});

export default Referee;
