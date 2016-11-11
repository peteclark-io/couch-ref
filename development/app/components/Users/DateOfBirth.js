'use strict';

import React from 'react';
import {connect} from 'react-redux';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';
import moment from 'moment';

import {setDateOfBirth} from '../../ducks/user';
import {saveDateOfBirth} from '../../core/db-actions';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = moment().year();

const DateOfBirth = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func,
    user: React.PropTypes.object
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
            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-10'], bootstrap['col-xs-offset-1'], bootstrap['col-sm-8'], bootstrap['col-sm-offset-2'])}>
                  <form className={bootstrap['form-inline']}>
                     <div className={bootstrap['form-group']}>
                        <select className={bootstrap['form-control']} onChange={this.onSelectDay}>
                        {days}
                        </select>
                     </div>
                     <div className={bootstrap['form-group']}>
                        <select className={bootstrap['form-control']} onChange={this.onSelectMonth}>
                        {months.map(month => {
                           return <option key={month}>{month}</option>
                        })}
                        </select>
                     </div>
                     <div className={bootstrap['form-group']}>
                        <select className={bootstrap['form-control']} onChange={this.onSelectYear}>
                        {years}
                        </select>
                     </div>
                     <div className={bootstrap['form-group']}>
                        <a className={classNames(buttons['action-button'], buttons.yes, buttons.animate, styles.button)}
                           onClick={() =>
                              {
                                 this.props.onChange(this.state, this.props.user);
                                 this.context.router.push('/users/sex');
                              }}
                        >Save</a>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
    );
  }
});

const getUser = (state = { user: {} }) => {
  return state.user;
};

const mapStateToProps = (state) => {
   return {
     user: getUser(state)
   };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (state, user) => {
      var birthday = moment.utc({years: state.year, months: state.month, date: state.day, hour: 0, minute: 0})
      dispatch(setDateOfBirth(birthday));
      saveDateOfBirth(user, birthday)
    }
  }
};

const LiveDateOfBirth = connect(
  mapStateToProps,
  mapDispatchToProps
)(DateOfBirth);

export default LiveDateOfBirth;
