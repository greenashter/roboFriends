import React , {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {

    constructor(){
        super();

        this.state = {
            robots : [],
            searchField : ''
        };
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots : users}));        
            // .then(users => this.setState({robots : []}));        
    }

    onSearchChange = (event) => {
        this.setState({searchField : event.target.value});        
    };

    onLoading(){
        return (
            <h1 className='tc'>Loading ...</h1>
        );
    }
    render(){
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter((robot) =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return ((! robots.length)? 
            this.onLoading() :
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots = {filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );

        
    }
    
};

export default App;

