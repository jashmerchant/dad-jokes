import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './JokeList.css';

class Jokelist extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: []
        }
        this.handleVote = this.handleVote.bind(this);
    }
    componentDidMount() {
        // let jokesArr = []
        // while(jokesArr.length < this.props.numJokesToGet) {
        //     axios.get('https://icanhazdadjoke.com/', {
        //         headers: {
        //             'Accept': 'application/json'
        //         }
        //     }).then(response => {
        //         jokesArr.push(response.data.joke);
        //     })
        // }
        for (let i = 0; i < this.props.numJokesToGet; i++) {
            axios.get('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                let newJoke = { id: response.data.id, jokeText: response.data.joke, count: 0 };
                this.setState({
                    jokes: [...this.state.jokes, newJoke]
                })
            })
        }
    }
    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? { ...j, count: j.count + delta } : j
                )
            })
        )
    }
    render() {
        return (
            <div className="JokeList">
                {/* {console.log("In Render")} */}
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad </span> Jokes
                    </h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className='JokeList-getmore' onClick={this.handleClick}>
                        Fetch Jokes
                    </button>
                </div>
                <div className='JokeList-jokes'>
                    {this.state.jokes.map(joke => (
                        <Joke
                            key={joke.id}
                            joke={joke.jokeText}
                            count={joke.count}
                            upvote={() => this.handleVote(joke.id, 1)}
                            downvote={() => this.handleVote(joke.id, -1)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Jokelist;