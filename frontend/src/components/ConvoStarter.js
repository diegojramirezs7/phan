import React from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function ConvoStarter(props){
	const imageStyle = {
		display: 'none'
	};

	return (
		<div className="convoStarter">
			<Typography style={{fontWeight: 700}}>
				Started by <Link to={props.header.author.url}>{props.header.author.name} </Link> 
				under <Link to={props.header.room.url}>{props.header.room.name} </Link>
			</Typography>
			<h5>
			Conversation: {props.header.title}
			</h5>

			<img 
				src={props.header.image} 
				className="convoStarterImage"
				style={props.header.hasImage ? null: imageStyle}
				alt={props.header.title}
			/>

			<Typography variant="body1" component="p">
			{props.header.content}
			</Typography>
		</div>
	);
}

export default ConvoStarter;