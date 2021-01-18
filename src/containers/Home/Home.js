import React, { useState, useEffect } from 'react';
import axiosFB from '../../axios-firebase';
import _ from 'lodash';

import Entity from '../../components/Entity/Entity';

export default function Home(props) {
  const [homepageEntities, setHomepageEntities] = useState(null);

  useEffect(() => {
    axiosFB.get('/homeEntities.json')
      .then(response => {
        let entities = [];
        if (response.data) {
          response.data.map(entity => {
            entities.push(entity);
            return null;
          })
          setHomepageEntities(_.groupBy(entities, 'type'));
        }
      })
      .catch(error => {
        console.log(error)
      });
  }, []);

  return (
    <div>
      { homepageEntities ?
          Object.values(homepageEntities).map((group, index) => {
            return <div key={'index'+index}>
                      {
                        group.map(entity => {
                          return <Entity key={entity.entity_id} entity={entity} />
                        })
                      }
                    </div>
          })
        :
          <div>Ga naar Edit om entiteiten toe te voegen</div>
      }
    </div>
  )
}
