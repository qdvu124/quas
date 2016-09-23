import React from 'react';
require('isomorphic-fetch');
import * as api from '../constants/API'

export default class BookForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            edition: '',
            author: '',
            publisher: '',
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    render () {
        return (
            <div className="form">
                <form>
                    Name: <input onChange={event => this.setState({ name: event.target.value })} /> <br />
                    Edition: <input onChange={event => this.setState({ edition : event.target.value })} /> <br />
                    Author: <input onChange={event => this.setState({ author : event.target.value })} /> <br />
                    Publisher: <input onChange={event => this.setState({ publisher : event.target.value })} /> <br />
                    <div>{this.state.name} </div>
                    <div>{this.state.edition} </div>
                    <div>{this.state.author} </div>
                    <div>{this.state.publisher} </div>
                    <button type='button' onClick={this.handleButtonClick} > Button Here </button>
                </form>
            </div>
        );
    }

    postBody () {
        return {
            name: this.state.name,
            edition: this.state.edition,
            author: this.state.author,
            publisher: this.state.publisher,
        };
    }

    handleButtonClick() {
        fetch(api.API, {
            method: 'post',
            body: JSON.stringify(this.postBody()),
            })
            .then( response =>  {
                console.log(response);
                if (response.status >= 400) {
                    //throw new Error("Bad response from server");
                }
                return response.json();
            })
        }
}