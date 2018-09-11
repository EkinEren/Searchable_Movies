import React, { Component } from 'react';
import logo from './logo.svg';
import { Card } from 'antd';
import './App.css';

const APIKEY = process.env.REACT_APP_MOVIE_API_KEY;
const apiurl = `http://www.omdbapi.com/?apikey=${APIKEY}&r=json&plot=short`;


class MovieReturned extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      title: 'red',
      desc: '',
      year: ''
    }
  }

  componentDidMount() {
    this.fetchSubmit();
  }

  fetchSubmit = () => {

    let url = `${apiurl}&t=${this.state.title}`

    fetch(url, { method: 'GET', cache: 'reload' })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          movies: data,
          title: data.Title,
          year: data.Year,
          desc: data.Plot
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    const { title, desc, year } = this.state

    return (
      <div className="wellDiv">
        <form className="well" onSubmit={this.fetchSubmit}>
          <fieldset>
            <legend>Search By Title</legend>
            <label for="title"> Title: </label>
            <input type="text" id="title" name="title" />
            <input type="submit" />
            <input type="reset" />
          </fieldset>
        </form>
        <ul>
          <li>{title}</li>
          <li>{desc}</li>
          <li>{year}</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MovieReturned />
      </div>
    );
  }
}

export default App;

//<Card title="Card title">Card content</Card>