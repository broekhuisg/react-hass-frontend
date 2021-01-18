import React, { useState, useEffect } from 'react';
import axiosFB from '../../axios-firebase';
import axiosHass from '../../axios-hass';

export default function Edit(props) {
  const [initEntities, setInitEntities] = useState(props.state.entities);
  const [homepageEntities, setHomepageEntities] = useState([]);

  const handleChange = (event) => {
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const entityType = event.target.attributes.getNamedItem('entitytype').value;

    const target = event.target;
    const name = target.name;
    let returnObject = {};

    Object.entries(initEntities).map(entityArr => {
      entityArr[1].map(entity => {
        if (entity.entity_id === name) {
          entity.attributes.react_on_homepage = entity.attributes.react_on_homepage ? false : true;
        }
        return null;
      });
      returnObject[entityArr[0]] = entityArr[1];
      return null;
    });

    setInitEntities(returnObject);
  }

  // Get the entities who are selected and select them by default
  const getSelectedEntities = (arr1, arr2) => {
    let returnObject = {};
    Object.entries(arr2).map(entityArr => {
      entityArr[1].map(obj2 => {
        arr1.map(obj1 => {
          if (obj2.entity_id === obj1.entity_id) {
            obj2.attributes.react_on_homepage = true;
          }
          return null;
        })
        return null;
      });

      returnObject[entityArr[0]] = entityArr[1];
      return null;
    });

    return returnObject;
  }

  useEffect((initEntities) => {
    let isMounted = true;
    axiosFB.get('/homepageEntities.json')
      .then(response => {
        if (isMounted) {
          setInitEntities(getSelectedEntities(response.data, initEntities));
          setHomepageEntities(response.data);
        }
      })
      .catch(error => {
        console.log(error)
      });
      return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const loadEntities = (event) => {
    event.preventDefault();

    axiosHass.get('/api/states')
    .then(response => {
      setInitEntities(props.getSelectableEntities(response.data));
      getSelectedEntities(homepageEntities, response.data);
    })
    .catch(error => {
      console.log(error)
    });
  }

  const postHomepageEntities = (event) => {
    event.preventDefault();

    let entitiesOnHomepage = [];
    Object.entries(initEntities).map(entityArr => {
      const entities = entityArr[1];
      entities.map(entity => {
        if (entity.attributes.react_on_homepage) {
          entitiesOnHomepage.push(entity);
        }
        return null;
      });
      return null;
    });

    axiosFB.put('/homepageEntities.json', entitiesOnHomepage)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <div>
        <form>
        { initEntities.scripts ?
            Object.entries(initEntities).map((entityArr, i) => {
              const entitiesType = entityArr[0];
              const entities = entityArr[1];
              let entitiesPerType = null;

              if (entities) {
                entitiesPerType = entities.map((entity, index) => {
                  return <div key={entity.entity_id}>
                          <label>
                            <input
                              type="checkbox"
                              entitytype={entity.type}
                              name={entity.entity_id}
                              onChange={handleChange}
                              checked={entities[index].attributes.react_on_homepage}
                              />
                            &nbsp;{ entity.attributes.friendly_name }
                          </label>
                        </div>
                });
              }

              return <div key={'index'+i}>
                <h2>{ entitiesType }</h2>
                { entitiesPerType }
              </div>
            })
          :
            <div>
              <button onClick={loadEntities} className="btn btn-warning">Load entities</button>
            </div>
          }

          <button className="btn btn-primary" onClick={postHomepageEntities}>Versturen</button>
        </form>
    </div>
  )
}
