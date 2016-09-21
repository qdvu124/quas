import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';
import BookForm from './components/book_form';
import BookList from './components/book_list';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = { };
    }

    render() {


        return (
            <div> 
                <SearchBar />
                <br />
                <BookForm />
                <br />
                <BookList />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
