import React from 'react';
import ConvoCard from './ConvoCard';
import StartConvo from './StartConvo';
import {connect} from 'react-redux';
import * as actions from '../actions/convoActions';
import axios from 'axios';

class Home extends React.Component{
	componentDidMount(){
		this.fetchConvos();
	}

	fetchConvos(){
		axios.get("http://localhost:8000/api/convos/", {
			headers: {
				'User-Key': this.props.user['key']
			}
		})
		.then(response => {
			const convos = response['data'];
	 		this.props.dispatch(actions.fetchConvosSuccess(convos));
		})
		.catch(error => {
			console.log(error);
		})
	}

	render(){
		const conversations = this.props.conversations;
		return (
			<div className="container content">
				<StartConvo />
				{
					Object.keys(conversations).map(conversationId => (
						<ConvoCard key={conversationId} convo={conversations[conversationId]} />
					))
				}
			</div>
		);
	}	
}

function mapStateToProps(state){
	return {
		conversations: state.convo_reducer.convos,
		rooms: state.room_reducer.rooms,
		people: state.user_reducer.people,
		user: state.user_reducer.currentUser
	};
}
export default connect(mapStateToProps)(Home);