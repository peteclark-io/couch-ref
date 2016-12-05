'use strict';

import React from 'react';
import {connect} from 'react-redux'
import _ from 'lodash';

import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';

const movement = (movement) => {
   if (movement > 0){
      return 'moved-up';
   }

   if (movement === 0){
      return 'no-move';
   }

   return 'moved-down';
};

const RefereeTable = React.createClass({

   propTypes: {
      referees: React.PropTypes.object
   },

   render: function() {
      if (!this.props.referees){
         return (
            <div className={styles.loading}>
               <ThreeBounce />
            </div>
         )
      }

      var refs = Object.keys(this.props.referees).map((id) => {
         return this.props.referees[id];
      });
      refs = _.orderBy(refs, ['totalScore', 'name.last'], ['desc', 'asc']);

      return (
         <div className={styles.referees}>
            <h1 className={styles.header}>League of Referees!</h1>
            {refs.map(function(ref) {
               return (
                  <div className={styles['ref-row']} key={ref.id}>
                     <h4 className={styles.name}>{ref.name.display}</h4>
                     <p>CouchRef Appearances: {ref.appearances}</p>
                     <p>Professional Debut: {ref.debut.format("MMM YYYY")}</p>
                     <p className={styles.score}>Score: {ref.totalScore.toFixed(0)}</p>
                     <span className={styles.movement}><div className={styles[movement(ref.movement)]}></div>{ref.movement}</span>
                  </div>
               );
            })}
         </div>
      );
   }
});

const getReferees = (state = {referees: {}}, id) => {
   return Object.keys(state.referees).length > 0 ? state.referees : undefined;
};

const mapStateToProps = (state) => {
   return {
      referees: getReferees(state)
   };
};

const LiveRefereeTable = connect(
   mapStateToProps
)(RefereeTable);

export default LiveRefereeTable;
