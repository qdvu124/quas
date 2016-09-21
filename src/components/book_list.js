import React from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class BookList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {list: ''};
        this.fetchBooks();
    }

    fetchBooks() {
            fetch('//localhost:2302/api/')
            .then( response =>  {
                console.log(response);

                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then( message => {
                console.log(message);
                this.setState({list: message.message});
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