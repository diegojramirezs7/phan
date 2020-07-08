import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import * as actions from '../actions/convoActions';
import {connect} from 'react-redux';

class Post extends React.Component {
	//const {author, title, content, upvotes, downvotes} = props.post;

	handleUpvote(){
		this.props.dispatch(actions.upvote_post(this.props.convoKey, this.props.postKey));
	}

	handleDownvote(){
		this.props.dispatch(actions.downvote_post(this.props.convoKey, this.props.postKey));
	}

	render(){
		return (
			<div className="col-md-9" >
				<Typography variant="subtitle2" style={{fontWeight: 700}}>
					<Link to="#">
						{this.props.author}
					</Link>
				</Typography>
				<Typography style={{fontWeight: 700}}>
					{this.props.title}
				</Typography>
				<Typography variant="body1" component="p">
					{this.props.content}
				</Typography>
				<IconButton size="small" onClick={() => this.handleDownvote()}>
					<ArrowDownwardIcon />{this.props.downvotes}
				</IconButton>
				<IconButton size="small" onClick={() => this.handleUpvote()}>
					<ArrowUpwardIcon />{this.props.upvotes}
				</IconButton>
			</div>
		);
	}
}

export default connect()(Post);