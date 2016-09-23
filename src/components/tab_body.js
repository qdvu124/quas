import React from 'react';
import SearchBar from './search_bar';
import BookForm from './book_form';
import BookList from './book_list';

class TabBody extends React.Component {

    render () {
        if(this.props.currentTab === 'list')
            return this.renderList();
        return this.renderPost();
        
    }

    renderList () {
        return (
            <div>
                <SearchBar />
                <BookList />
            </div>
        );
    }

    renderPost (){
         return (
             <div>
                <SearchBar />
                <br />
                <BookForm />
            </div>
        );     
    }
}

export default TabBody;