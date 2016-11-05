'use strict';

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {setSex} from '../../ducks/user';

import buttons from '../Questions/buttons.css';
import styles from './styles.css';

const sex = ["Female", "Male", "Other"];

const Gender = React.createClass({

  propTypes: {
    save: React.PropTypes.func
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
              <select className={styles['sex-select']} onChange={this.onChange}>
                {sex.map(s => {
                  return <option key={s}>{s}</option>
                })}
              </select>
              <a onClick={() => {
                this.props.save(this.state);
                this.context.router.push('/users/location');
              }}
                 className={classNames(buttons['action-button'], buttons.yes, buttons.animate, styles.button)}>Save</a>
            </section>
         </div>
      </div>
    );
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    save: (state) => {
      dispatch(setSex(state.sex));
    }
  }
};

const LiveGender = connect(
  undefined,
  mapDispatchToProps
)(Gender);

export default LiveGender;
