import React from 'react';
import * as api from '../constants/API'

require('es6-promise').polyfill();
require('isomorphic-fetch');

class BookList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {list: ''};
        this.fetchBooks();
    }

    fetchBooks() {
            fetch(`${api.API}/57e5802ec395465743000002`, {
                headers: {
                    Authorization: '',
                }
            })
            .then( response =>  {
                console.log(response);
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then( book => {
                console.log(book);
                this.setState({list: book.name});
            });
        }

    render() {
        return(
            <div>
                {!this.state.list? 'Loading' : this.state.list}
            </div>
        );
    }
}

export default BookList;