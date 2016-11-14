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
      age: React.PropTypes.object,
      sex: React.PropTypes.object,
      location: React.PropTypes.object
   },

   render: function() {
      var hl = highlight(this.props.age, this.props.sex, this.props.location);
      if (!hl) {
         return null; // nothing to see here...
      }

      return (
         <div>
            <h2 className={styles.headline}>{hl.headline}% <small>{hl.blurb}</small></h2>
            {
               hl.type === 'age' ?
               <div>
                  <h2 className={styles['verdict-header']}>Breakdown by Age</h2>
                  <AgeBreakdownChart age={this.props.age} />
               </div> : null
            }
            {
               hl.type === 'sex' ?
               <div>
                  <h2 className={styles['verdict-header']}>Breakdown by Gender</h2>
                  <SexBreakdownChart sex={this.props.sex} />
               </div> : null
            }
         </div>
      );
   }
});

export default Highlight;
