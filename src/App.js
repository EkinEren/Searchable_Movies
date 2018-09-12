import React, { Component } from 'react';
import './css/App.css';
import MovieReturned from './MovieApi.js';
import Footer from './footer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Find Movie By Title
        </header>
        <br />
        <MovieReturned />
        <Footer />
      </div>
    );
  }
}

export default App;