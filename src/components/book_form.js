import React from 'react';
require('isomorphic-fetch');
import * as api from '../constants/API'

class BookForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            edition: '',
            author: '',
            publisher: '',
        }
    }
    render () {
        return (
            <div className="form">
                <form>
                    Name: <input onChange={event => this.setState({ name: event.target.value })} /> <br />
                    Edition: <input onChange={event => this.setState({ edition : event.target.value })} /> <br />
                    Author: <input onChange={event => this.setState({ author : event.target.value })} /> <br />
                    Publisher: <input onChange={event => this.setState({ publisher : event.target.value })} /> <br />
                    <button onClick={this.handleButtonClick}>Button </button>
                </form>
            </div>
        );
    }

    postBody(){
        return {
            Name: this.state.name,
            Edition: this.state.edition,
            Author: this.state.author,
            Publisher: this.state.publisher,
        };
    }

    handleButtonClick() {
        fetch(api.API,{
            method: 'POST',
            header: {
                Authorization: '',
            },
            body: this.postBody(),
            })
            .then( response =>  {
                console.log(response);

                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then( message => {
                console.log(message);
            });

    }
}

export default BookForm;