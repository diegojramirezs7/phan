import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ConvoCard from './ConvoCard';
import * as actions from '../actions/roomActions';
import axios from 'axios';
import {connect} from 'react-redux';

function RoomPage(props){
	const { room_url } = useParams();
	//const [conversations, setConversations] = useState(null);
	const conversations = props.conversations;

	useEffect(() => {
		async function fetchData(){
    		axios.get(`http://localhost:8000/api/rooms/${room_url}`, {
    			headers: {
    				'User-Key': props.user['key']
    			}
    		}).then(response => {
    			//console.log(response['data']);
    			props.dispatch(actions.fetch_convos_success(response['data']));
    		}).catch(error => {
    			console.log(error);
    		})
		}
		
		fetchData();
	})

	return (
		<div className="container content">
			<Card className="convoCard" >
				<CardContent className="convo-content" style={{paddingBottom: "4px"}}>
					<h2>{room_url}</h2>
					<p>
						Read and engage with the best ideas ever thought related the knowledge of our world. 
						From particle physics to relativity, biology and chemistry.
					</p>
				</CardContent>
			</Card>
			{
				Object.keys(conversations).filter(conversationId => (
					conversations[conversationId].convoStarter.room.url === `/rooms/${room_url}`
				)).map(conversationId => (
					<ConvoCard key={conversationId} convo={conversations[conversationId]} />
				))
			}
		</div>
	);
}

function mapStateToProps(state){
	return {
		conversations: state.convos,
		user: state.currentUser
	};
}

export default connect(mapStateToProps)(RoomPage);