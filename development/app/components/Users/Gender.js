'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {setSex} from '../../ducks/user';
import {saveSex} from '../../core/db-actions';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

const sex = ["Female", "Male", "Other"];

const Gender = React.createClass({

  propTypes: {
    save: React.PropTypes.func,
    user: React.PropTypes.object
  },

  contextTypes: {
     router: React.PropTypes.object
  },

  getInitialState: function(){
     if (this.props.user && this.props.user.sex){
      return {
         sex: this.props.user.sex
      };
     }
     return {sex: 'Female'};
  },

  onChange: function(event){
    this.setState({
      sex: event.target.value
    });
  },

  render: function() {
    return (
      <div>
         <h3 className={styles.question}>Sex?</h3>
         <div className={styles['asl-container']}>
            <div className={bootstrap.row}>
               <div className={classNames(bootstrap['col-xs-10'], bootstrap['col-xs-offset-1'], bootstrap['col-sm-8'], bootstrap['col-sm-offset-2'])}>
                  <form className={bootstrap['form-inline']}>
                     <div className={bootstrap['form-group']}>
                        <select className={bootstrap['form-control']} defaultValue={this.state.sex} onChange={this.onChange}>
                          {sex.map(s => {
                            return <option key={s}>{s}</option>
                          })}
                        </select>
                     </div>
                     <div className={bootstrap['form-group']}>
                        <a onClick={() => {
                           this.props.save(this.props.user, this.state);
                           this.context.router.push('/users/location');
                        }}
                        className={classNames(buttons['action-button'], buttons.yes, buttons.animate, styles.button)}>Save</a>
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
    save: (user, state) => {
      dispatch(setSex(state.sex));
      saveSex(user, state.sex);
    }
  }
};

const LiveGender = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gender);

export default LiveGender;
