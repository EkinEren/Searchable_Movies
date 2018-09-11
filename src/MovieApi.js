import React, { Component } from 'react';
import './App.css';
import { Spin, Icon, Card, Button, Form, Input } from 'antd';

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
            input: '',
            isLoading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchSubmit = this.fetchSubmit.bind(this);
    }

    fetchSubmit = () => {

        let url = `${apiurl}&t=${this.state.input}`

        this.setState({ isLoading: true });

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
                    poster: data.Poster,
                    isLoading: false
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

        const { title, desc, year, poster, isLoading } = this.state

        const antLoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

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
                        <Card
                            title={title}
                            style={{ width: 300 }}
                            className="well"
                            cover={<img src={poster} />}
                        >
                            <p>{desc}</p>
                            <p>{year}</p>
                        </Card>
                        <br />
                    </div>
                }
            </div>
        );
    }
}

export default MovieReturned;