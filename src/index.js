import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAiNyGgE5ntBES7fclYRfARCo22bazEj18';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null,
        };

        this.videoSearch('kirameki guitar')
       
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, videos => {
            this.setState({ 
                videos,
                selectedVideo: videos[0],
             });
            //this.setState({ videos: videos }), ES6 feature
        }); 
    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div> 
                <SearchBar onSearchTermChange={videoSearch} />
                <br/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
