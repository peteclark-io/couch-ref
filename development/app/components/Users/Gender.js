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
            <section className={styles.sex}>
              <div className={bootstrap.row}>
                <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-10'])}>
                  <select className={styles['sex-select']} onChange={this.onChange}>
                    {sex.map(s => {
                      return <option key={s}>{s}</option>
                    })}
                  </select>
                </div>
                <div className={classNames(bootstrap['col-xs-12'], bootstrap['col-sm-2'])}>
                  <a onClick={() => {
                    this.props.save(this.props.user, this.state);
                    this.context.router.push('/users/location');
                  }}
                     className={classNames(buttons['action-button'], buttons.yes, buttons.animate, styles.button)}>Save</a>
                </div>
              </div>
            </section>
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
