'use strict'

import React from 'react';
import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.css';

const TeamSheet = React.createClass({

  propTypes: {
    'referee': React.PropTypes.string,
    'homeLineup': React.PropTypes.arrayOf(
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
      }))
  },

  getInitialState: function(){
      return {show: true};
  },

  showTeamSheets: function(){
    this.setState({show: !this.state.show});
  },

  render: function() {
    console.log(this.state);
    return (
      <div>
         <h4 className={styles['team-sheet-header']}>Teams {
             this.state.show ?
                <small className={styles.chevron} onClick={this.showTeamSheets}>
                  <span className={classNames(bootstrap.glyphicon, bootstrap['glyphicon-chevron-up'])} />
                </small>
                :
                <small className={styles.chevron} onClick={this.showTeamSheets}>
                  <span className={classNames(bootstrap.glyphicon, bootstrap['glyphicon-chevron-down'])} />
                </small>
           }
         </h4>
         {
           this.state.show ?
              <div>
                <div className={bootstrap.row}>
                   <div className={bootstrap['col-xs-6']}>
                       {this.props.homeLineup.map(player => {
                         return <div className={bootstrap.row} key={player.number}>
                                   <div className={bootstrap['col-xs-12']}>
                                     <p className={styles.player}><span>{player.number}</span> {player.moniker}</p>
                                   </div>
                                </div>;
                       })}
                   </div>
                   <div className={bootstrap['col-xs-6']}>
                       {this.props.awayLineup.map(player => {
                         return <div className={bootstrap.row} key={player.number}>
                                   <div className={bootstrap['col-xs-12']}>
                                     <p className={styles.player}><span>{player.number}</span> {player.moniker}</p>
                                   </div>
                                </div>;
                       })}
                   </div>
                 </div>
                 <h4 className={styles.referee}>Referee: {this.props.referee}</h4>
               </div> : null
         }
      </div>
    );
  }
});

export default TeamSheet;
