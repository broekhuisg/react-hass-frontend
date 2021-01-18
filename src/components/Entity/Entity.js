import React from 'react';
import classes from './Entity.module.scss';
import axiosHass from '../../axios-hass';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import OnOffSwitch from '../OnOffSwitch/OnOffSwitch';


export default function Entity(props) {
  const scriptTurnOn = (entity_id) => {
    axiosHass.post('/api/services/script/turn_on', {entity_id: entity_id})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <div className={classes.Entity}>
      <span className={classes.title}>{ props.entity.attributes.friendly_name }</span>
      { props.entity.type !== 'script' ?
        <OnOffSwitch />
      :
        <button onClick={() => scriptTurnOn(props.entity.entity_id)} className="btn btn-primary">Activeer</button>
      }
    </div>
  )
}
