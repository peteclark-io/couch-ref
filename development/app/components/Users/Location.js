'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {setLocation} from '../../ducks/user';
import {saveLocation} from '../../core/db-actions';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

import countries from './countries';

const Location = React.createClass({

  propTypes: {
    save: React.PropTypes.func,
    user: React.PropTypes.object
  },

  contextTypes: {
     router: React.PropTypes.object
  },

  getInitialState: function(){
    return {location: 'United Kingdom'};
  },

  onChange: function(event){
    this.setState({
      location: event.target.value
    });
  },

  render: function() {
    return (
      <div>
         <h3 className={styles.question}>Location?</h3>
         <div className={styles['asl-container']}>
            <section className={styles.sex}>
              <select defaultValue={'United Kingdom'} onChange={this.onChange}>
                {countries.map(c => {
                  if (c === 'United Kingdom'){
                    return <option key={c}>{c}</option>
                  }
                  return <option key={c}>{c}</option>
                })}
              </select>
              <a onClick={() => {
                this.props.save(this.props.user, this.state);
                this.context.router.push('/');
              }}
                 className={classNames(buttons['action-button'], buttons.yes, buttons.animate, styles.button)}>Save</a>
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
      dispatch(setLocation(state.location));
      saveLocation(user, state.location);
    }
  }
};

const LiveLocation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);

export default LiveLocation;
