import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import * as actions from '../actions/convoActions';
import {connect} from 'react-redux';
import axios from 'axios';

class Post extends React.Component {
	//const {author, title, content, upvotes, downvotes} = props.post;

	handleUpvote(){
		//this.props.dispatch(actions.upvote_post(this.props.convoKey, this.props.postKey));
		const convoKey = this.props.convoKey;
		axios.put("http://localhost:8000/api/convos/"+ convoKey, {
			command: "upvote_post"
		}, {
			headers: {
				'User-Key': this.props.user['key']
			}
		}).then(response => {
			//this.props.dispatch(actions.upvote_convo(response['data']));
			console.log(response);
		}).catch(error => {
			console.log(error);
		})
	}

	handleDownvote(){
		this.props.dispatch(actions.downvote_post(this.props.convoKey, this.props.postKey));
	}

	render(){
		const {convos, convoKey, postKey} = this.props;
		return (
			<div className="col-md-9" >
				<Typography variant="subtitle2" style={{fontWeight: 700}}>
					<Link to={this.props.author.url}>
						{this.props.author.name}
					</Link>
				</Typography>
				<Typography style={{fontWeight: 700}}>
					{this.props.title}
				</Typography>
				<Typography variant="body1" component="p">
					{this.props.content}
				</Typography>
				<IconButton size="small" 
					style={(convos[convoKey].relatedPosts[postKey].relevantRels['downvoted'])?{color:'blue'}:null}
					onClick={() => this.handleDownvote()}>
					<ArrowDownwardIcon />{this.props.downvotes}
				</IconButton>
				<IconButton size="small" 
					style={(convos[convoKey].relatedPosts[postKey].relevantRels['upvoted'])?{color:'blue'}:null}
					onClick={() => this.handleUpvote()}>
					<ArrowUpwardIcon />{this.props.upvotes}
				</IconButton>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		convos: state.convos
	}
}

export default connect(mapStateToProps)(Post);