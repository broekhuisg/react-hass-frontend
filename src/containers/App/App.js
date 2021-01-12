import React, { Component } from 'react';
import classes from './App.module.scss';
import axios from '../../axios-hass';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    axios.get('/api/states')
      .then(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className={classes.App}>

      </div>
    )
  }
}

export default App;

