import React from 'react';
import './App.css';
import CardItem from './CardItem.js';
import { Spin, Icon, Button, Form, Input } from 'antd';

const APIKEY = process.env.REACT_APP_MOVIE_API_KEY;
const apiurl = `https://www.omdbapi.com/?apikey=${APIKEY}&r=json&plot=short`;
const antLoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
let input = '';
const message = "Sorry, we couldn't find any movies with the title you were looking for.";

class MovieReturned extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            isLoading: false
        }
    }

    fetchSubmit = () => {

        let url = `${apiurl}&s=${input}`

        this.setState({ isLoading: true });

        fetch(url, { method: 'GET', cache: 'reload' }, {
            headers: { Accept: 'application/json' },
            credentials: 'same-origin',
            timeout: 8500
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                const movieList = data.Search.map((movie) => {

                    return {
                        title: movie.Title,
                        year: movie.Year,
                        poster: movie.Poster
                    };
                })
                this.setState({
                    isLoading: false,
                    movieList: movieList

                });
            })

            .catch(err => {
                console.log(err);
                this.setState({
                    isLoading: false,
                    movieList: message
                })
            });
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.fetchSubmit();
    }

    handleChange = (e) => {

        input = e.target.value;
    }

    renderCards = () => {
        const { movieList } = this.state;
        return movieList.map((item, index) =>
            <CardItem
                key={index}
                title={item.title}
                poster={item.poster}
                year={item.year}
            />
        );
    }

    render() {

        const { movieList, isLoading } = this.state

        return (
            <div>
                <Form className="well" layout="inline" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Search By Title</legend>
                        <label htmlFor="title" style={{ fontSize: "large" }}> Title: </label>
                        <Input type="text" id="title" name="title" style={{ width: 200, marginLeft: 20 }} onChange={this.handleChange} />&nbsp;
                        <Button type="primary" htmlType="submit" className="Button-space"> Submit </Button>
                        <Button type="danger" htmlType="reset" className="Button-space" > Reset </Button>
                    </fieldset>
                </Form>
                {isLoading ?
                    <div>
                        <br />
                        <Spin indicator={antLoadingIcon} />
                        <h2>Loading...</h2>
                    </div> :
                    movieList === message ?
                        <div> <br /> <h3>{message}</h3>  <br /> </div> :
                        <div>
                            <br />
                            {this.renderCards()}
                        </div>
                }
            </div>
        );
    }
}

export default MovieReturned;


/* Did this for the styling of renderCards() render :

style={{ display: "flex", flexDirection: "row"}}

Succesfully displayed cards side by side, but sizes didn't match & looked funny so didn't use it

*/