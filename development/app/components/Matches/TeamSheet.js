'use strict'

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import {ThreeBounce} from 'better-react-spinkit';

import styles from './styles.css';

const TeamSheet = React.createClass({

  propTypes: {
    match: React.PropTypes.shape({
      'referee': React.PropTypes.string,
      'homeLineup': React.PropTypes.arrayOf(
        React.PropTypes.shape({
          'number': React.PropTypes.number,
          'moniker': React.PropTypes.string,
          'fullName': React.PropTypes.string,
          'position': React.PropTypes.string
        })),
      'homeSubs': React.PropTypes.arrayOf(
        React.PropTypes.shape({
          'number': React.PropTypes.number,
          'moniker': React.PropTypes.string,
          'fullName': React.PropTypes.string,
          'position': React.PropTypes.string
        })),
      'awayLineup': React.PropTypes.arrayOf(
        React.PropTypes.shape({
          'number': React.PropTypes.number,
          'moniker': React.PropTypes.string,
          'fullName': React.PropTypes.string,
          'position': React.PropTypes.string
        })),
      'awaySubs': React.PropTypes.arrayOf(
        React.PropTypes.shape({
          'number': React.PropTypes.number,
          'moniker': React.PropTypes.string,
          'fullName': React.PropTypes.string,
          'position': React.PropTypes.string
        }))
    })
  },

  render: function() {
    console.log('hi');
    if (!this.props.match){
      return (
        <div className={styles.loading}>
          <ThreeBounce />
        </div>
      );
    }

    return (
      <div>
         <h2 className={styles['team-sheet-header']}>Teams</h2>
         <div>
           <div className={bootstrap.row}>
              <div className={bootstrap['col-xs-6']}>
                  {this.props.match.homeLineup.map(player => {
                    return <div className={bootstrap.row} key={player.number}>
                              <div className={bootstrap['col-xs-12']}>
                                <p className={styles.player}><span>{player.number}</span> {player.moniker}</p>
                              </div>
                           </div>;
                  })}
              </div>
              <div className={bootstrap['col-xs-6']}>
                  {this.props.match.awayLineup.map(player => {
                    return <div className={bootstrap.row} key={player.number}>
                              <div className={bootstrap['col-xs-12']}>
                                <p className={styles.player}><span>{player.number}</span> {player.moniker}</p>
                              </div>
                           </div>;
                  })}
              </div>
            </div>
            <h4 className={styles['subs']}>Subs</h4>
            <div className={bootstrap.row}>
               <div className={bootstrap['col-xs-6']}>
                  {this.props.match.homeSubs.map(player => {
                    return <div className={bootstrap.row} key={player.number}>
                              <div className={bootstrap['col-xs-12']}>
                                <p className={styles.player}><span>{player.number}</span> {player.moniker}</p>
                              </div>
                           </div>;
                  })}
               </div>
               <div className={bootstrap['col-xs-6']}>
                  {this.props.match.awaySubs.map(player => {
                    return <div className={bootstrap.row} key={player.number}>
                              <div className={bootstrap['col-xs-12']}>
                                <p className={styles.player}><span>{player.number}</span> {player.moniker}</p>
                              </div>
                           </div>;
                  })}
               </div>
            </div>
            <h4 className={styles.referee}>Referee: {this.props.match.referee}</h4>
          </div>
      </div>
    );
  }
});

export default TeamSheet;
