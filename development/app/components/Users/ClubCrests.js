'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {ThreeBounce} from 'better-react-spinkit';

import {selectClub} from '../../ducks/user';
import styles from './styles.css';

import {saveClub} from '../../core/cookies';
import {saveClub as saveClubToDb} from '../../core/db-actions';

export const ClubCrests = React.createClass({

   propTypes: {
      clubs: React.PropTypes.array,
      selectClub: React.PropTypes.func,
      user: React.PropTypes.object
   },

   contextTypes: {
      router: React.PropTypes.object
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
            <h3 className={styles.question}>Who Do You Support in the Premier League?</h3>
            <section className={styles['clubs-container']}>
               <ul className={styles.clubs}>
                  {this.props.clubs.map((c) => {
                     return (
                        <li key={c.name}>
                           <img src={c.crestUrl} alt={c.name} onClick={() => {
                                 this.props.selectClub(this.props.user, c);
                                 this.context.router.push('/users/birthday');
                              }}></img>
                           </li>
                        );
                     })}
                  </ul>
                  {/*<button>Other</button>*/}
                  <h4 className={styles.disclaimer}>We currently only collect data on Premier League fans, sorry if you support someone else!</h4>
               </section>
            </div>
         );
      }
   });

   const getClubs = (state = {clubs: []}, id) => {
      return state.clubs.length > 0 ? state.clubs : null;
   };

   const getUser = (state = { user: {} }) => {
      return state.user;
   };

   const mapStateToProps = (state) => {
      return {
         clubs: getClubs(state),
         user: getUser(state)
      };
   };

   const mapDispatchToProps = (dispatch) => {
      return {
         selectClub: (user, club) => {
            dispatch(selectClub(club));
            saveClub(club);
            saveClubToDb(user, club);
         }
      }
   };

   const LiveClubCrests = connect(
      mapStateToProps,
      mapDispatchToProps
   )(ClubCrests);

   export default LiveClubCrests;
