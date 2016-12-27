'use strict'

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

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
         <h4 className={styles.referee}>Referee: <Link to={`/referee/${this.props.referee.id}`}>{this.props.referee.name.display}</Link></h4>
      );
   }
});

export default Referee;
