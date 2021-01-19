import React from 'react';
import classes from './OnOffSwitch.module.scss';

export default function OnOffSwitch(props) {
  return (
    <React.Fragment>
      {props.checked}
      <label className={classes.switch}>
        <input type="checkbox" onChange={props.switchHandler} defaultChecked={props.checked} />
        <span className={[classes.round, classes.slider].join(' ')}></span>
      </label>
    </React.Fragment>
  )
}

