import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';
import TabBody from './components/tab_body'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { currentTab: 'list' };
    }

    render() {
         return(
              <div> 
                <ul > 
                    <button onClick={() => this.setState({ currentTab: 'list'})}>Menu 1</button>
                    <button onClick={() => this.setState({ currentTab: 'post'})}>Menu 2</button>
                </ul>
                <TabBody currentTab={this.state.currentTab}/>
              </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
