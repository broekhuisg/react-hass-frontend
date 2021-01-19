import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import axiosFB from '../../axios-firebase';
import axiosHass from '../../axios-hass';
import Container from 'react-bootstrap/Container';
import Edit from '../Edit/Edit';
import Home from '../Home/Home';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: null,
    }
  }

  componentDidMount() {
    axios.all([
      axiosHass.get('/api/states'),
      axiosFB.get('/homeEntities.json')
    ])
    .then(axios.spread((...responses) => {
      const hassData = responses[0];
      const firebaseData = responses[1];

      hassData.data.map((hassEntity, index) => {
        hassEntity.type = this.getEntityType(hassEntity);
        hassEntity.react_on_homepage = false;
        firebaseData.data.filter((firebaseEntity) => {
          if (hassEntity.entity_id === firebaseEntity.entity_id) {
            hassData.data[index].react_on_homepage = true;
          }
          return null;
        })
        return null;
      })

      console.log(hassData.data);

      this.setState({
        all: hassData
      })
    }));
  }

  getEntityType = (entity) => {
    if (entity.entity_id) {
      return entity.entity_id.split(".")[0];
    }
    return null;
  }

  render() {
    return (
      <Container>
        <BrowserRouter>
          <Link to="/">Home</Link>
          &nbsp; - &nbsp;
          <Link to="/edit">Edit</Link>
          <Route
            path="/"
            exact
            render={() => <Home entities={this.state.all} />} />
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

