import React from 'react';
import classes from './OnOffSwitch.module.scss';


export default function OnOffSwitch(props) {
  return (
    <React.Fragment>
      <label className={classes.switch}>
        <input type="checkbox" />
        <span className={[classes.round, classes.slider].join(' ')}></span>
      </label>
    </React.Fragment>
  )
}

