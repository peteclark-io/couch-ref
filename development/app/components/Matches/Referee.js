'use strict'

import React from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';

import {matchScore} from '../../core/scores';
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

const getLiveMatch = (state = {matches: []}, id) => {
   var filtered = _.filter(state.matches, {id: id});
   return filtered.length === 0 ? undefined : filtered[0];
};

const getReferee = (match, state = {referees: {}}) => {
   var ref = state.referees[match.referee];
   return ref ? ref : undefined;
};

const mapStateToProps = (state, ownProps) => {
   var match = getLiveMatch(state, ownProps.id);
   return {
      referee: getReferee(match, state)
   };
};

const LiveReferee = connect(
   mapStateToProps
)(Referee);

export default LiveReferee;
