import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as actions from '../actions/convoActions';
import {connect} from 'react-redux';

class ConvoFooter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			active: false,
			premise: "",
			explanation: ""
		}
	}

	handleToggle(){
		this.setState({
			active: !this.state.active,
			premise: "",
			explanation: ""
		})
	}

	handlePremiseChange(e){
		this.setState({
			premise: e.target.value
		})
	}

	handleExplanationChange(e){
		this.setState({
			explanation: e.target.value
		})
	}

	handleUpvote(){
		const convoKey = this.props.convoKey;
		this.props.dispatch(actions.upvote_convo(convoKey));
	}

	handleDownvote(){
		const convoKey = this.props.convoKey;
		this.props.dispatch(actions.downvote_convo(convoKey));
	}

	render(){
		const {score, upvotes, downvotes} = this.props.footer;

		const tfStyle = {
			marginBottom: "2vh"
		}


		return (
			<div className="convoFooter">
				<IconButton size="small" title="save" >
					<BookmarkIcon />
				</IconButton>
				<IconButton size="small" title="downvote" onClick={() => this.handleDownvote()}>
					<ArrowDownwardIcon />{downvotes}
				</IconButton>
				<IconButton size="small" title="upvote" onClick={() => this.handleUpvote()}>
					<ArrowUpwardIcon />{upvotes}
				</IconButton>
				<IconButton size="small" title="share your thoughts" onClick={(e) => this.handleToggle(e)}>
					<ReplyIcon fontSize="large" />
				</IconButton>

				<Dialog 
					open={this.state.active}
					onClose={(e) => this.handleToggle(e)}
					scroll="paper"
					aria-labelledby="scroll-dialog-title"
					aria-describedby="scroll-dialog-description"
					maxWidth="xs"
					fullWidth={true}
				>
					<DialogTitle>Post to Conversation</DialogTitle>

					<DialogContent dividers={true}>
				    	<TextField 
	    					placeholder="Main Idea"
			    			fullWidth
			    			style={tfStyle}
			    			value={this.state.premise}
			    			onChange={(e)=>this.handlePremiseChange(e)}
	    				/>
	    				<TextField
				          	id="standard-multiline-static"
				          	fullWidth
				         	multiline
				          	rows={4}
				          	placeholder="Further Thoughts"
				          	style={tfStyle}
				          	value={this.state.explanation}
			    			onChange={(e)=>this.handleExplanationChange(e)}
				        />
				    </DialogContent>
				     <DialogActions>
	          			<Button style={{background: "#5f5f5f", color: "#fff"}} variant="contained">
	            			Post
	          			</Button>
	       		 	</DialogActions>
				</Dialog>
				
			</div>
		);
	}
}

export default connect()(ConvoFooter);