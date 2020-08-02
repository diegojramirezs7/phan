import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../actions/convoActions';

function RoomCard(props) {
	const roomKey = props.roomKey;

	function handleSave(){
		axios.put("http://localhost:8000/api/users/"+ roomKey, {
			command: "save"
		}, {
			headers: {
				'User-Key': props.user['key']
			}
		}).then(response => {
			props.dispatch(actions.save_room(response['data']));
		}).catch(error => {
			console.log(error);
		})
	}


	return (
		<Card className="roomCard">
			<CardContent>
				<Link to={props.user.url}>
					<h4>{props.user.name}</h4>
				</Link>
				<Typography  variant="body1" component="p">
				{props.user.bio}
				</Typography>
			</CardContent>
			<CardActions className="roomFooter" style={{paddingTop: "0px"}}>
				<div className="roomFooter">
					
					<Typography variant="body1" component="strong" style={{padding: "0px 1vw"}}>
						Followers: {props.user.followers}
					</Typography>
					<Typography variant="body1" component="strong" style={{padding: "0px 1vw"}}>
						Score: {props.user.score}
					</Typography>
					<IconButton size="small" title="save"  
						onClick={() => handleSave()}
					>
						<BookmarkIcon />
					</IconButton>
				</div>
			</CardActions>
		</Card>
	);
}

function mapStateToProps(state){
	return {
		currentUser: state.currentUser,
		users: state.people
	}
}


export default connect(mapStateToProps)(RoomCard);