import React from 'react';
import './css/App.css';
import CardItem from './CardItem.js';
import { Spin, Icon, Button, Form, Input } from 'antd';

const APIKEY = process.env.REACT_APP_MOVIE_API_KEY;
const apiurl = `http://www.omdbapi.com/?apikey=${APIKEY}&r=json&plot=short`;
const antLoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class MovieReturned extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            isLoading: false
        }
    }

    fetchSubmit = () => {

        let url = `${apiurl}&s=${this.state.input}`

        this.setState({ isLoading: true });

        fetch(url, { method: 'GET', cache: 'reload' })
            .then(res => {
                return res.json();
            })
            .then(data => {
                const movieList = data.Search.map((movie, i, arr) => {

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
            });
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.fetchSubmit();
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
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

        const { isLoading } = this.state

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