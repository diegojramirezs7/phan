import React from 'react';
import RoomCard from './RoomCard';
import CreateRoom from './CreateRoom';
import {connect} from 'react-redux';
import * as actions from '../actions/roomActions';
import axios from 'axios';

class Rooms extends React.Component{
	fetchRooms(){
		axios.get("http://localhost:8000/api/rooms/", {
			headers: {
				'User-Key': this.props.user['key']
			}
		})
		.then(response => {
			const rooms = response['data'];
	 		this.props.dispatch(actions.fetch_rooms_success(rooms));
		})
		.catch(error => {
			console.log(error);
		})
	}

	componentDidMount(){
		this.fetchRooms();
	}

	render(){
		const rooms = this.props.rooms;
		return (
			<div className="container content">
				<CreateRoom />
				{
					Object.keys(rooms).map(roomKey => (
						<RoomCard key={roomKey} room={rooms[roomKey]} roomKey={roomKey}/>
					))
				}
			</div>
		);
	}
	
}

function mapStateToProps(state){
	return {
		rooms: state.room_reducer.rooms,
		user: state.user_reducer.currentUser
	};
}

export default connect(mapStateToProps)(Rooms);