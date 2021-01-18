import React from 'react';
import classes from './Entity.module.scss';
import axiosHass from '../../axios-hass';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import OnOffSwitch from '../OnOffSwitch/OnOffSwitch';


export default function Entity(props) {

  const scriptTurnOnHandler = (entity_id) => {
    axiosHass.post('/api/services/script/turn_on', {entity_id: entity_id})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
  }

  const lightToggleHandler = (entity_id) => {
    const postBody = {
      entity_id: entity_id
    }

    axiosHass.post('/api/servics/light/toggle', postBody)
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
        <OnOffSwitch switchHandler={() => lightToggleHandler(props.entity.entity_id)} />
      :
        <button onClick={() => scriptTurnOnHandler(props.entity.entity_id)} className="btn btn-primary">Activeer</button>
      }
    </div>
  )
}
