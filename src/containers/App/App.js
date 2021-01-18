import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import axiosHass from '../../axios-hass';
import Container from 'react-bootstrap/Container';
import Edit from '../Edit/Edit';
import Home from '../Home/Home';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: null,
      homepage: {
        routines: []
      },
      rooms: {
        livingroom: [],
        kitchen: []
      },
    }
  }

  componentDidMount() {
    axiosHass.get('/api/states')
      .then(response => {
        this.setCustomEntityAttributes(response.data);
        this.setState({
          all: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getEntityType = (entity) => {
    if (entity.entity_id) {
      return entity.entity_id.split(".")[0];
    }
    return null;
  }

  setCustomEntityAttributes = (entities) => {
    entities.map(entity => {
      entity.react_on_homepage = false;
      entity.type = this.getEntityType(entity);
      return null;
    });
    return null;
  }

  render() {
    return (
      <Container>
        <BrowserRouter>
          <Link to="/">Home</Link>
          &nbsp; - &nbsp;
          <Link to="/edit">Edit</Link>
          <Route path="/" exact render={() => <Home />} />
          <Route
            path="/edit"
            exact
            render={() => <Edit entities={this.state.all} />} />
        </BrowserRouter>
      </Container>
    )
  }
}

export default App;

