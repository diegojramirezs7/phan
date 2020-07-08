import React from 'react';
import ConvoCard from './ConvoCard';
import StartConvo from './StartConvo';
import {connect} from 'react-redux';
import * as actions from '../actions/convoActions';

class Home extends React.Component{
	componentDidMount(){}

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
		people: state.people
	};
}
export default connect(mapStateToProps)(Home);