import React, { Component } from 'react';
import './App.css';
import MovieReturned from './MovieApi.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Find Movie By Title</h1>
        <MovieReturned />
      </div>
    );
  }
}

export default App;