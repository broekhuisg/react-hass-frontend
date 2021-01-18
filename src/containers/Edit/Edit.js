import React, { useState, useEffect } from 'react';
import axiosFB from '../../axios-firebase';

export default function Edit(props) {
  const [groupedEntities, setGroupedEntities] = useState([]);

  useEffect(() => {
    getAndMergeEntities();
  }, [props.entities]);

  const getAndMergeEntities = () => {
    axiosFB.get('homeEntities.json')
      .then(response => {
        Object.values(response.data)[0].map(result => {
          props.entities.filter((entity, index) => {
            if (entity.entity_id === result.entity_id) {
              return props.entities[index].react_on_homepage = true;
            }
          });
        })
        setGroupedEntities(createGroupsPerType(props.entities));
      })
      .catch(error => {
        console.log(error)
      });
  }



  // const setCheckedEntities = async(checkedEntities, allEntities) => {
  //   let convertCheckedEntities = await checkedEntities;
  //   let convertAllEntities = await allEntities;
  //   let homepageEntities = [];

  //   if (convertCheckedEntities && convertAllEntities) {
  //     Object.values(convertCheckedEntities).map(result => {
  //       console.log(result);
  //       return null;
  //     });

  //   }
  // }

  const createGroupsPerType = (entities) => {
    let scripts = [];
    let lights = [];

    if (entities && entities.length) {
      entities.map(entity => {
        if (entity.type === 'script') {
          // console.log(entity);
          scripts.push(entity)
        }
        if (entity.type === 'light') {
          lights.push(entity)
        }
        return null;
      });
    }

    return {
      scripts: scripts,
      lights: lights
    }
  }

  const handleCheckbox = (event) => {
    const target = event.target;
    const name = target.name;
    let updatedGroupEntities = {};

    Object.entries(groupedEntities).map((group, groupindex) => {
      return group[1].map((entity, entityindex) => {
        if (entity.entity_id === name) {
          entity.react_on_homepage = entity.react_on_homepage ? false : true;
        }
        updatedGroupEntities[group[0]] = group[1];
        return null;
      });
    });
    setGroupedEntities(updatedGroupEntities);
  }

  const submitHomepageEntities = (event) => {
    event.preventDefault();
    let postObject = [];

    Object.values(groupedEntities).map(group => {
      return group.map(entity => {
        if (entity.react_on_homepage) {
          postObject.push(entity);
        }
        return null;
      })
    });

    axiosFB.post('homeEntities.json', postObject)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <div>
      { groupedEntities ?
        <React.Fragment>
          <button onClick={submitHomepageEntities} className="btn btn-warning">Versturen</button>

          <div className="row">
          {
            Object.entries(groupedEntities).map((group, index) => {
              // console.log(group);

              return <div className="col-md-6" key={'index'+index}>
                      <h2>{group[0]}</h2>
                      <div>
                        {
                          group[1].length ?
                            group[1].map(entity => {
                              return <div key={entity.entity_id}>
                                        <label>
                                          <input
                                            type="checkbox"
                                            name={entity.entity_id}
                                            onChange={handleCheckbox}
                                            checked={entity.react_on_homepage}
                                            />
                                          &nbsp;{ entity.attributes.friendly_name }
                                        </label>
                                      </div>
                            })
                          :
                            <div>Entiteiten moeten nog worden geladen...</div>
                        }
                      </div>
                    </div>
            })
          }
        </div>
        </React.Fragment>
      :
        <div>Er zijn geen grouped entities</div>
      }
    </div>
  )
}
