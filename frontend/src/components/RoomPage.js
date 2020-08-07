import React, { useLayoutEffect } from 'react';
import {useParams} from "react-router-dom";
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ConvoCard from './ConvoCard';
import * as actions from '../actions/roomActions';
import axios from 'axios';
import {connect} from 'react-redux';
import {capitalize} from '../helpers/stringManipulation';

function RoomPage(props){
	const { room_url } = useParams();
	//const [conversations, setConversations] = useState(null);
	const {conversations, user, dispatch} = props;

	useLayoutEffect(() => {
		async function fetchData(){
    		axios.get(`http://localhost:8000/api/rooms/${room_url}`, {
    			headers: {
    				'User-Key': user['key']
    			}
    		}).then(response => {
    	
    			dispatch(actions.fetch_convos_success(response.data.convos));
    			dispatch(actions.add_room(response.data.room));
    		}).catch(error => {
    			console.log(error);
    		})
		}
		
		fetchData();
	}, [user, dispatch, room_url])



	return (
		<div className="container content">
			<Card className="convoCard" >
				<CardContent className="convo-content" style={{paddingBottom: "4px"}}>
					<h2>
						{
							Object.keys(props.rooms).filter(roomId => props.rooms[roomId].url === `/rooms/${room_url}`)
							.map(roomId => (
								capitalize(props.rooms[roomId].title)
							))
						}
					</h2>
					<p>
						{
							Object.keys(props.rooms).filter(roomId => props.rooms[roomId].url === `/rooms/${room_url}`)
							.map(roomId => (
								props.rooms[roomId].description
							))
						}
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
		conversations: state.convo_reducer.convos,
		user: state.user_reducer.currentUser,
		rooms: state.room_reducer.rooms
	};
}

export default connect(mapStateToProps)(RoomPage);