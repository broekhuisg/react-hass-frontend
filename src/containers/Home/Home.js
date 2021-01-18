import React, { useState, useEffect } from 'react';
import axiosFB from '../../axios-firebase';

import Entity from '../../components/Entity/Entity';

export default function Home(props) {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    axiosFB.get('/homepageEntities.json')
      .then(response => {
        setScripts(response.data);
      })
      .catch(error => {
        console.log(error)
      });
  }, []);

  return (
    <div>
      { scripts ?
          scripts.map(script => {
            return <Entity key={script.entity_id} entity={script} />
          })
        :
            null
      }
    </div>
  )
}
