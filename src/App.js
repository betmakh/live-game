import React, { Component } from 'react';

import logo from './logo.svg';
import Field from './components/Field';
import Evolution from './utils/Evolution';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    var size = 10,
      evo = new Evolution({ size });
    this.state = {
      isRunning: false,
      size,
      evo,
      field: evo.getField()
    };
  }
  startEvo() {
    this.state.evo.start().on('generationStep', data => {
      this.setState({ field: data.field });
    });
    this.setState({ isRunning: true });
  }
  pauseEvo() {
    this.state.evo.stop();
    this.setState({ isRunning: false });
  }
  updateField(field) {
    this.setState({ field });
    this.state.evo.setField(field);
  }
  generateField() {
    var field = this.state.evo.generateField(this.state.size);
    this.setState({ field });
  }
  render() {
    const { isRunning, field, size } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <button disabled={isRunning} onClick={this.startEvo.bind(this)}>
            Start
          </button>
          <button disabled={!isRunning} onClick={this.pauseEvo.bind(this)}>
            Pause
          </button>
          <button onClick={this.generateField.bind(this)}>Generate random field</button>
          <input value={size} type="number" onChange={event => this.setState({ size: parseInt(event.target.value) })} />
        </div>
        <Field field={field} updateFieldCallback={this.updateField.bind(this)} />
      </div>
    );
  }
}

export default App;
