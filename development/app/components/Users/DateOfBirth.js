'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';

import {setDateOfBirth} from '../../ducks/user';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = moment().year();

const DateOfBirth = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func
  },

  contextTypes: {
     router: React.PropTypes.object
  },

  getInitialState: function(){
    return {
      year: currentYear,
      month: 0,
      day: 1
    };
  },

  onSelectDay: function(event){
    this.setState(Object.assign({}, this.state, {
      day: parseInt(event.target.value)
    }));
  },

  onSelectMonth: function(event){
    this.setState(Object.assign({}, this.state, {
      month: months.indexOf(event.target.value)
    }));
  },

  onSelectYear: function(event){
    this.setState(Object.assign({}, this.state, {
      year: parseInt(event.target.value)
    }));
  },

  render: function() {
    var days = [];
    for(var i = 1; i <= 31 ; i++){
      days.push(<option key={i}>{i}</option>)
    }

    var years = [];
    for(var i = currentYear; i >= 1920 ; i--){
      years.push(<option key={i}>{i}</option>)
    }

    return (
      <div>
         <h3 className={styles.question}>When&#39;s Your Date of Birth?</h3>
         <div className={styles['asl-container']}>
            <section className={styles.age}>
              <select onChange={this.onSelectDay}>
                {days}
              </select>
              <select onChange={this.onSelectMonth}>
                {months.map(month => {
                  return <option key={month}>{month}</option>
                })}
              </select>
              <select onChange={this.onSelectYear}>
                {years}
              </select>
              <a onClick={() =>
                {
                  this.props.onChange(this.state);
                  this.context.router.push('/users/sex');
                }}
                className={classNames(buttons['action-button'], buttons.yes, buttons.animate, styles.button)}>Save</a>
            </section>
         </div>
      </div>
    );
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (state) => {
      dispatch(setDateOfBirth(moment.utc({years: state.year, months: state.month, date: state.day, hour: 0, minute: 0})));
    }
  }
};

const LiveDateOfBirth = connect(
  undefined,
  mapDispatchToProps
)(DateOfBirth);

export default LiveDateOfBirth;
