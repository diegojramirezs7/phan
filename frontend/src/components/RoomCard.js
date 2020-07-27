import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {Link} from 'react-router-dom';

function RoomCard(props) {
	return (
		<Card className="roomCard">
			<CardContent>
				<Link to="#">
					<h4>{props.room.title}</h4>
				</Link>
				<Typography  variant="body1" component="p">
				{props.room.description}
				</Typography>
			</CardContent>
			<CardActions className="roomFooter" style={{paddingTop: "0px"}}>
				<div className="roomFooter">
					
					<Typography variant="body1" component="strong" style={{padding: "0px 1vw"}}>
						Followers:19k
					</Typography>
					<Typography variant="body1" component="strong" style={{padding: "0px 1vw"}}>
						Conversations:71k
					</Typography>
					<IconButton size="small" title="save" style={{padding: "0px 1vw"}}>
						<BookmarkIcon />
					</IconButton>
				</div>
			</CardActions>
		</Card>
	);
}


export default RoomCard;