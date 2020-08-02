import React from 'react';
import './App.css';
import Home from './components/Home';
import Rooms from './components/Rooms';
import Header from './components/Header';
import Users from './components/Users';
import {
  BrowserRouter as Router,
  //Switch,
  Route
  //Link
} from "react-router-dom";
//import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import convo_reducer from './reducers/convoReducer';

// const preloadedState = {
// 	currentUser: {
// 		key: '111',
// 		name: 'Diego Ramirez',
// 		score: 7
// 	},
// 	convos: {
// 		'zzzzz': {
// 			key: 'zzzzz',
// 			relevantRels: {},
// 			convoStarter: {
// 				title: "Katie Boulter is the most heavenly creature on the planet.",
// 				author: {name :"Roger Federed", url: "/roger_federer", key: "111111"},
// 				room: {name: "Sports", url: '/sports', key: "300339f"},
// 				hasImage: true,
// 				image: "https://tennistonic.com/wp-content/uploads/2019/05/Katie-Boulter.jpg",
// 				content: "Boulter, who hails from Woodhouse Eaves, has won five singles and four doubles titles on the ITF Women's Circuit." +
// 				"On 18 February 2019, she reached her best singles ranking of world No. 82. On 31 December 2018, she peaked at No. 431 in the doubles rankings."+
// 		 		"Boulter was ranked the No. 10 junior tennis player in the world in March 2014."+ 
// 		 		" She is based at the Lawn Tennis Association's National Tennis Centre in Roehampton and is coached by Jeremy Bates, Nigel Sears and Mark Taylor."
// 			},
// 			relatedPosts: {
// 				"1": {
// 					key: "1",
// 					author: "Emma Watson",
// 					title: "hell yeess, even I'm in love with her. ",
// 					content: "She is so gorgeous, just look at her eyes and her smile. "+
// 					"Besides that she's probably going to be the next big deal in tennis. Next number one in the world.",
// 					relevantRels: {},
// 					upvotes: 77,
// 					downvotes: 34
// 				},
// 				"2": {
// 					key: "2",
// 					author: "Serena Williams",
// 					title: "Totally, I think about her every day.",
// 					content: "I don't really think I need anything else to this, it's just so obvious",
// 					relevantRels: {},
// 					upvotes: 4,
// 					downvotes: 1
// 				}
// 			},
// 			convoFooter: {
// 				score: 7,
// 				upvotes: 1345,
// 				downvotes: 773
// 			}
// 		},
// 		'78910': {
// 			key: '78910',
// 			relevantRels: {},
// 			convoStarter: {
// 				title: "Programming is the new poetry.",
// 				author: {name :"Diego Ramirez", url: "/diego_ramirez", key: "999999"},
// 				room: {name: "Technology", url: '/technology', key: "86949f"},
// 				hasImage: true,
// 				image: "https://techcrunch.com/wp-content/uploads/2017/09/gettyimages-484267214.jpg",
// 				content: "Programming is the process of creating a set of instructions that tell a computer how to perform a task." +
// 				" Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++."+
// 		 		" Meet a professional - everyone from mobile health app developers to product managers to physics programmers."+ 
// 		 		" Computer programming is the process of designing and building an executable computer program to accomplish a specific computing result. "
// 			},
// 			relatedPosts: {
// 				"4": {
// 					key: "4",
// 					author: "Alan Turing",
// 					title: "As you know, I'm the father of computer science. You're welcome",
// 					content: "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human."+
// 					" Otherwise, you just can't do it.",
// 					relevantRels: {},
// 					upvotes: 77,
// 					downvotes: 34
// 				},
// 				"5": {
// 					key: "5",
// 					author: "Charles Babbage",
// 					title: "This Turing guy ...",
// 					content: "He might be the father of computer science, but I'm the father of computers in general."+
// 					" You tell me which one is more important.",
// 					relevantRels: {},
// 					upvotes: 4,
// 					downvotes: 1
// 				}
// 			},
// 			convoFooter: {
// 				score: 7,
// 				upvotes: 7777,
// 				downvotes: 111
// 			}
// 		}
// 	},
// 	rooms: {
// 		'1234': {
// 			key: '1234',
// 			relationship: 'suggested',
//         	title: "US Politics",
//         	visitors: "78k",
//           	description: "Everything related to US politics, democrats, republicans, the president and congress. "+
//           	"with the elections approaching this is the perfect place to discuss all of your concerns, opinions and arguments."
//         },
//         '7777': {
//         	key: '7777',
//         	relationship: 'joined',
//         	title: "Sports",
//         	visitors: "84k",
//         	description: 'Discussions on Transfer Markets, Upcoming Games, etc.'
//         }
// 	},
// 	people: {
// 		'2222': {
// 			key: '2222',
// 			relationship: 'suggested',
// 			name: "Alan Turing",
//           	bio: "Mathematician, Cryptanalyst, and Computer Scientist. I broke the Nazi enigma machine. "+
//           	"Check out my new paper: Computer Machinery and Intelligence"
// 		},
// 		'3333': {
// 			key: '3333',
// 			relationship: 'following',
// 			name: "Robert Smith",
//           	bio: "Musician. The Cure's Frontman. I'd rather cut off my hands before receiving an award from the royal family."
// 		}
// 	},
// 	communication: {
// 		loading: false,
// 		loadingSuccess: false
// 	},
// 	tags: {
// 		'1234': {
// 			key: '1234',
// 			name: 'Programming',
// 			tag_url: '/programming'
// 		},
// 		'4567': {
// 			key: '4567',
// 			name: 'Tennis',
// 			tag_url: '/tennis'
// 		},
// 		'7890': {
// 			key: '7890',
// 			name: 'Beauty',
// 			tag_url: '/beauty'
// 		},
// 		'9090': {
// 			key: '9090',
// 			name: 'Software',
// 			tag_url: '/software'
// 		}

// 	}
// }


const someState = {
	currentUser: {
		key: '111',
		name: 'Diego Ramirez',
		score: 7
	},
	convos: {},
	rooms: {},
	tags: {},
	people: {},
	communication: {}
}

var store = createStore(convo_reducer, someState, applyMiddleware(thunk));

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
						<Route exact path="/room">
							<div></div>
						</Route>
						<Route exact path="/profile">
							<div></div>
						</Route>
						<Route exact path="/convo">
							<div></div>
						</Route>
					</div>
				</Router>
		    </Provider>
	  	);
  	}
  
}

export default App;
