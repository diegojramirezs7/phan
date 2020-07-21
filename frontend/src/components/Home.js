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
			console.log(convos);
	 		this.props.dispatch(actions.fetchConvosSuccess(convos));
		})
		.catch(error => {
			console.log(error);
		})
	}

	handleMe(){
		this.props.dispatch(actions.upvote_convo());
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
		conversations: state.convos,
		rooms: state.rooms,
		people: state.people,
		user: state.currentUser
	};
}
export default connect(mapStateToProps)(Home);