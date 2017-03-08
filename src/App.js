import React, { Component } from 'react';
import './App.css';

import { Button, Header, Icon, Divider } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className={'name-header'} size={'huge'} inverted>Carlos Santisteban</Header>
        <Button color='linkedin' compact icon='linkedin' size={'huge'}/>
        <Button color='instagram' compact icon='github' size={'huge'}/>
        <Divider />
        <Header size={'big'} inverted>Projects</Header>
      </div>
    );
  }
}

export default App;
