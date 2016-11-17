'use strict';

import React from 'react';

import classNames from 'classnames';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import AgeBreakdownChart from './AgeBreakdownChart';
import SexBreakdownChart from './SexBreakdownChart';

import {highlight} from '../../core/highlights';
import styles from './styles.css';

const Highlight = React.createClass({

   propTypes: {
      clubs: React.PropTypes.array,
      age: React.PropTypes.object,
      sex: React.PropTypes.object,
      location: React.PropTypes.object,
      club: React.PropTypes.object,
   },

   render: function() {
      var hl = highlight(this.props.clubs, this.props.age, this.props.sex, this.props.location, this.props.club);
      if (!hl) {
         return null; // nothing to see here...
      }

      console.log(hl);

      return (
         <div>
            <div className={styles.highlight}>
               <h2>{hl.headline.toFixed(0)}% <small>{hl.blurb}</small></h2>
            </div>
            {
               hl.type === 'age' ?
               <div>
                  <h2 className={styles['minor-header']}>Breakdown by Age</h2>
                  <AgeBreakdownChart age={this.props.age} />
               </div> : null
            }
            {
               hl.type === 'sex' ?
               <div>
                  <h2 className={styles['minor-header']}>Breakdown by Gender</h2>
                  <SexBreakdownChart sex={this.props.sex} />
               </div> : null
            }
         </div>
      );
   }
});

export default Highlight;
