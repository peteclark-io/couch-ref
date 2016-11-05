'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {ThreeBounce} from 'better-react-spinkit';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './styles.css';

const ASL = React.createClass({

  propTypes: {
    clubs: React.PropTypes.array
  },

  getInitialState: function(){
     return {
       dob: moment()
     };
  },

  render: function() {
    if (!this.props.clubs){
      return (
         <div className={styles.loading}>
           <ThreeBounce color="white" />
         </div>
      );
    }

    return (
      <div>
         <h3 className={styles.question}>Age, Sex, Location?</h3>
         <div className={styles['asl-container']}>
            <section className={styles.age}>
              <DatePicker
                  selected={this.state.dob}
                  onChange={(update) => {
                    console.log(update);
                  }} />
            </section>
         </div>
      </div>
    );
  }
});

const getClubs = (state = {clubs: []}, id) => {
  return state.clubs.length > 0 ? state.clubs : null;
};

const mapStateToProps = (state) => {
   return {
     clubs: getClubs(state)
   };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (question, result) => {
      saveVote(question, result);
      dispatch(vote(question, result));
    }
  }
};

const LiveASL = connect(
  mapStateToProps
)(ASL);

export default LiveASL;
