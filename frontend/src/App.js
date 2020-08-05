import React from 'react';
import './App.css';
import Home from './components/Home';
import Rooms from './components/Rooms';
import Header from './components/Header';
import Users from './components/Users';
import ConvoPage from './components/ConvoPage';
import RoomPage from './components/RoomPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers/mainReducer';

const someState = {
	user_reducer: {
		currentUser: {
			key: '111',
			name: 'Diego Ramirez',
			score: 7
		},
		people: {}
	},
	convo_reducer: {
		convos: {},
		tags: {}
	},
	room_reducer: {
		rooms: {}
	},
	communication_reducer: {
		communication: {}
	}
}

var store = createStore(reducer, someState, applyMiddleware(thunk));

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	componentDidMount(){
		// axios.get("http://localhost:8000/api/user")
		// .then(response => {
		// 	this.props.dispatch({type: 'SET_USER', payload: response.data})
		// })
	}

	handleMe(){
		console.log(store.getState());
	}

	render(){
		console.log(store.getState());
	  	return (
		    <Provider store={store} className="App">
		    	{
		    		//<div onClick={() => this.handleMe()}>See state</div>	
		    	}
		    	<Router>
		    		<Header />
					<div>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/rooms">
							<Rooms />
						</Route>
						<Route exact path="/users">
							<Users />
						</Route>
						<Route path="/convos/:convo_url">
							<ConvoPage />
						</Route>
						<Route path="/rooms/:room_url">
							<RoomPage />
						</Route>
					</div>
				</Router>
		    </Provider>
	  	);
  	}
  
}

export default App;
