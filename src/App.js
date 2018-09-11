import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const APIKEY = process.env.REACT_APP_MOVIE_API_KEY;
const apiurl = `http://www.omdbapi.com/?apikey=${APIKEY}&r=json&plot=short`;


class MovieReturned extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      title: '',
      desc: '',
      year: '',
      poster: '',
      input: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchSubmit = this.fetchSubmit.bind(this);
  }

  fetchSubmit = () => {

    let url = `${apiurl}&t=${this.state.input}`
    console.log(this.state.input);
    console.log(url);

    fetch(url, { method: 'GET', cache: 'reload' })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          movies: data,
          title: data.Title,
          year: data.Year,
          desc: data.Plot,
          poster: data.Poster
        });
      })
      .catch(err => {
      });
  }

  handleSubmit(e) {

    e.preventDefault();
    if (this.state.title !== this.state.input)
      this.fetchSubmit();
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  render() {

    const { title, desc, year, poster } = this.state

    return (
      <div className="wellDiv">
        <form className="well" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Search By Title</legend>
            <label htmlFor="title"> Title: </label>
            <input type="text" id="title" name="title" onChange={this.handleChange} />
            {console.log(this.state.input)}
            <input type="submit" value="Submit" />
            <input type="reset" />
          </fieldset>
        </form>
        <img src={poster} />
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
        <h1> Find Movie By Title</h1>
        <MovieReturned />
      </div>
    );
  }
}

export default App;