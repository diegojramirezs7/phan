import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';


function RoomCard(props) {
	return (
		<Card className="roomCard">
			<CardContent>
				<h4>{props.room.title}</h4>
				<Typography  variant="body1" component="p">
				{props.room.description}
				</Typography>
			</CardContent>
			<CardActions>
			</CardActions>
		</Card>
	);
}


export default RoomCard;