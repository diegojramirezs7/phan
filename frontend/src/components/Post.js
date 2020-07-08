import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';

function Post(props) {
	//const {author, title, content, upvotes, downvotes} = props.post;
	return (
		<div className="col-md-9" >
			<Typography variant="subtitle2" style={{fontWeight: 700}}>
				<Link to="#">
					{props.author}
				</Link>
			</Typography>
			<Typography style={{fontWeight: 700}}>
				{props.title}
			</Typography>
			<Typography variant="body1" component="p">
				{props.content}
			</Typography>
			<IconButton size="small"><ArrowUpwardIcon />{props.upvotes}</IconButton>
			<IconButton size="small"><ArrowDownwardIcon />{props.downvotes}</IconButton>
		</div>
	);
}

export default Post;