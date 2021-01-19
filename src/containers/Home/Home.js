import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import Entity from '../../components/Entity/Entity';

export default function Home(props) {
  const [homepageEntities, setHomepageEntities] = useState(null);

  useEffect(() => {
    let returnArr = [];

    if (props.entities) {
      props.entities.data.map(entity => {
        if (entity.react_on_homepage) {
          returnArr.push(entity);
        }
        return null;
      });

      setHomepageEntities(_.groupBy(returnArr, 'type'));
    }
  }, [props.entities]);

  return (
    <div>
      { homepageEntities ?

          Object.entries(homepageEntities).map((group, index) => {
              return <React.Fragment key={'index'+index}>
                  <h2>{ group[0] }</h2>
                  {
                      group[1].map(entity => {
                        return <Entity key={entity.entity_id} entity={entity} />
                      })
                  }
              </React.Fragment>
          })
        :
          <div>Ga naar Edit om entiteiten toe te voegen</div>
      }
    </div>
  )
}
