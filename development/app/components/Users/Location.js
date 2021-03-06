'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import {setLocation} from '../../ducks/user';
import {saveLocation} from '../../core/db-actions';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

import countries from '../../core/countries';

export const Location = React.createClass({

   propTypes: {
      save: React.PropTypes.func,
      user: React.PropTypes.object,
      edited: React.PropTypes.bool
   },

   contextTypes: {
      router: React.PropTypes.object
   },

   getInitialState: function(){
      if (this.props.user && this.props.user.location){
         return {
            location: this.props.user.location
         };
      }
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
               <div className={bootstrap.row}>
                  <div className={classNames(bootstrap['col-xs-10'], bootstrap['col-xs-offset-1'], bootstrap['col-sm-8'], bootstrap['col-sm-offset-2'])}>
                     <form className={bootstrap['form-inline']}>
                        <div className={bootstrap['form-group']}>
                           <select className={bootstrap['form-control']} defaultValue={this.state.location} onChange={this.onChange}>
                              {countries.map(c => {
                                 if (c === 'United Kingdom'){
                                    return <option key={c}>{c}</option>
                                 }
                                 return <option key={c}>{c}</option>
                              })}
                           </select>
                        </div>
                        <div className={bootstrap['form-group']}>
                           <a onClick={() => {
                                 this.props.save(this.props.user, this.state);
                                 if (this.props.location.query.edited){
                                    this.context.router.push('/users/edit');
                                 } else {
                                    this.context.router.push('/');
                                 }
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
