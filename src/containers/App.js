import React , {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField, requestRobots } from "../actions";
import {connect} from 'react-redux';


const mapStateToProps = (state) =>{
    return ({
        searchField : state.searchRobots.searchField,
        isPending :state.requestRobots.isPending,
        robots : state.requestRobots.robots,
        error : state.requestRobots.error
    })
};

const mapDispatchTpProps = (dispatch) => {
    return({
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots : () => dispatch(requestRobots())
    })
}

class App extends Component {

    // constructor(){
    //     super();

    //     this.state = {
    //         robots : [],
    //         // searchField : ''
    //     };
    // }

    componentDidMount(){
        this.props.onRequestRobots();
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => response.json())
        //     .then(users => this.setState({robots : users}));        
            // .then(users => this.setState({robots : []}));        
    }

    // onSearchChange = (event) => {
    //     this.setState({searchField : event.target.value});        
    // };

    onLoading(){
        return (
            <h1 className='tc'>Loading ...</h1>
        );
    }
    render(){
        // const {robots, searchField} = this.state;
        // const {robots} = this.state;
        const {searchField, onSearchChange, robots, isPending} = this.props;

        const filteredRobots = robots.filter((robot) =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return (isPending? 
            this.onLoading() :
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                {/* <SearchBox searchChange = {this.onSearchChange}/> */}
                <SearchBox searchChange = {onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots = {filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );

        
    }
    
};

export default connect(mapStateToProps, mapDispatchTpProps)(App);

