import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete'; 
import Chip from '@material-ui/core/Chip';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';
import * as actions from '../actions/convoActions';
import axios from 'axios';


class StartConvo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			active: false, 
			premise: "",
			explanation: "",
			image: React.createRef(),
			imageUploaded: false,
			imageFile: "",
			mainroom: "",
			tags: [],
			error: "",
			suggestRooms: [],
			suggestTags: [],
			roomValidated: false
		};

		this.rooms = [
			{title: "Technology", rank: "3", key: "technology"},
			{title: "US Politics", rank: "4", key: "uspolitics"},
			{title: "Soccer", rank: "8", key: "soccer"},
			{title: "Indie Rock", rank: "5", key: "indierock"},
			{title: "Canada", rank: "9", key: "canada"},
			{title: "Literature", rank: "7", key: "literature"},
			{title: "European Union", rank: "6", key: "eu"},
			{title: "Quantum Mechanics", rank: "10", key: "quantumMechanics"},
			{title: "Particle Physics", rank: "10", key: "particlePhysics"}
		]
	}

	componentDidMount(){
		//take the rooms and tags present on the state and add them to be possible suggestions
		// for autocomplete
		
		const tags = Object.keys(this.props.tags).map(tagId => this.props.tags[tagId].name);
		this.setState({
			suggestTags: tags
		})
		this.addRoomSuggestions()
	}

	addRoomSuggestions(){
		const rooms = Object.keys(this.props.rooms).map(roomId => this.props.rooms[roomId].title);
		this.setState({
			suggestRooms: rooms
		})
	}

	handleToggle(){
		this.setState({
			active: !this.state.active,
			imageUploaded: false, 
			premise: "",
			explanation: "",
			error: "",
			mainroom: "",
			tags: []
		});
	}

	addImage(){
		const inputImg = document.getElementById('convoImage');
		console.log(this.state.image);
		inputImg.click();
	}

	handleImageUpload(e){
		const [file] = e.target.files;
		if(file){
			const reader = new FileReader();
			const {current} = this.state.image;
			current.file = file;
			this.setState({
				imageUploaded: true,
				imageFile: file
			})
			reader.onload = (e) => {
				current.src = e.target.result;
			}
			reader.readAsDataURL(file);
		}
	}

	deleteImage(){}


	handlePremiseChange(e){
		this.setState({
			premise: e.target.value,
			error: ""
		});
	}

	handleExplanationChange(e){
		this.setState({
			explanation: e.target.value,
			error: ""
		});
	}

	autocompleteRoom(ev, value){
		this.setState({
			mainroom: value,
			error: ""
		})
	}

	autocompleteTags(ev, values, opt){
		this.setState({
			tags: values
		})
	}


	validateInput(){
		if(this.state.premise === "" || this.state.explanation === ""){
			this.setState({
				error: "Please fill the input fields."
			})
			return false;
		}else if (this.state.mainroom === ""){
			this.setState({
				error: "Please select a room for your convo."
			})
			return false;
		}
		else if(!this.state.roomValidated){
			//if function is returned directly, it will return undefined sometimes. 
			const result = this.validateRoom();
			return result;
		}else {
			this.setState({
				error: ""
			})
			return true;
		}
	}

	validateRoom(){
		const currentRoom = this.state.mainroom.trim();
		if(this.state.suggestRooms.includes(currentRoom)){
			this.setState({
				error: "",
				roomValidated: true
			})
			return true;
		}else if (currentRoom === ""){
			this.setState({
				error: "",
				roomValidated: false
			})
			return false;
		}
		else{
			const roomParam = currentRoom.toLowerCase().replace(" ", "%20")
			const url_query = "http://localhost:8000/api/rooms?name="+roomParam;

			axios.get(url_query, {
				headers: {
					'User-Key': this.props.user['key']
				}
			})
			.then(response => {
				if (response['status'] === 200){
					this.props.dispatch(actions.add_room(response['data']))
					this.addRoomSuggestions();
					this.setState({
						error: "",
						roomValidated: true,
					})
					return true;
				}else if (response['status'] === 202){
					this.setState({
						error: response['data'],
						roomValidated: false
					})
					return false;
				}else {
					this.setState({
						roomValidated: false
					})
					return false;
				}
			})
			.catch(error => {
				console.log(error);
				return false;
			})
		}
	}


	// -------------------- Fetching and Updating (API interaction) ------------------- //

	shareConvo(){
		//this.props(dispatch(actions.add_convo_begin()))
		const convoContent = {
			userKey: this.props.user['key'],
			title: this.state.premise,
			author: this.props.user['name'],
			mainroom: this.state.mainroom,
			tags: this.state.tags,
			hasImage: false,
			//image: this.state.image,
			content: this.state.explanation
		}

		var result = this.validateInput();

		if (result){
			this.handleToggle();
			this.send_convo(convoContent);
		}
	}

	fetchConvos(){
		axios.get("http://localhost:8000/api/convos/", {
			headers: {
				'User-Key': this.props.user['key']
			}
		})
		.then(response => {
			const convos = response['data'];
	 		this.props.dispatch(actions.fetchConvosSuccess(convos));
		})
		.catch(error => {
			console.log(error);
		})
	}

	send_convo(convoContent){
		//sort of done on this side, server still needs work
		//still need to process image
	 	axios.post("http://localhost:8000/api/convos/", {
	 		convo: convoContent
	 	}, {
	 		headers: {
	 			'User-Key': this.props.user['key']
	 		}}
	 	)
	 	.then(response => {
	 		console.log(response['data']);
	 		this.props.dispatch(actions.add_convo_success(response['data']));
	 	})
    	.catch(error => {
    		//this.props.resetState();
    		console.log(error);
    	})
	}


	defaultIfEmpty = value => {
    	return value === "" ? "" : value;
  	}


	render(){
		const imageStyle = {
			width: "100%",
			height: "25vh",
			margin: "2vh auto",
			textAlign: "center",
			display: "block"
		};

		const tfStyle={
			marginBottom: '2vh'
		}

		return(
			 <div className="startConvo">
    			<Link to="#" style={{display: "flex", alignItems: "center", color: "#5f5f5f",}}>
    				<Avatar>
        				<AccountCircleIcon />
      				</Avatar>
      				<span> Diego Ramirez</span>
    			</Link>

    			<TextField 
    				placeholder="Start A Conversation"
		    		fullWidth
		    		className="col-md-12"
		    		style={{marginBottom: "2vh"}}
		    		onClick={(e) => this.handleToggle(e)}
    			/>

    			<Dialog
			    	open={this.state.active}
			        onClose={(e) => this.handleToggle(e)}
			        scroll="paper"
			        aria-labelledby="scroll-dialog-title"
			        aria-describedby="scroll-dialog-description"
			        maxWidth="xs"
			        fullWidth={true}  
			    >
				    <DialogTitle>Start A Conversation</DialogTitle>
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
				        <input type="file" id="convoImage" style={{display: "none"}}
				        	accept="image/*" name="image" onChange={(e)=>this.handleImageUpload(e) }
				        />
				        <img alt="" ref={this.state.image} style={this.state.imageUploaded ? imageStyle: null}/>
				        <Autocomplete
							id="rooms-standard"
						    options={this.state.suggestRooms}
						  	fullWidth
						  	freeSolo
						  	onInputChange={(ev, value) => this.autocompleteRoom(ev, value)}
						  	onBlur={() => this.validateRoom()}
						  	renderInput={(params) => 
						  		<TextField {...params} label="Room to Share" variant="outlined" style={tfStyle}
						  		/>
						  	}
						/>
						
					    <Autocomplete
							id="tags-standard"
							multiple
						    options={this.state.suggestTags}
						  	fullWidth
						  	freeSolo
						  	onChange={(event, value, opt)=>this.autocompleteTags(event, value, opt)}
						  	renderTags={(value, getTagProps) =>
					          value.map((option, index) => (
					            <Chip label={option} {...getTagProps({ index })} />
					          ))
					        }
						  	renderInput={(params) => 
						  		<TextField {...params} label="Add Tags" variant="outlined" style={tfStyle}
						  		
						  		/>
						  	}
						/>
						<div className="create-convo-error-div">
							{this.state.error}
						</div>

				    </DialogContent>
				    <DialogActions>
				    	<IconButton onClick={() => this.addImage()} label="Add Image">
				    		
				    		<CameraAltIcon/>
				    	</IconButton> 
	          			<Button style={{background: "#5f5f5f", color: "#fff"}} 
	          				variant="contained" onClick={() => this.shareConvo() }>
	            			Share
	          			</Button>
	       		 	</DialogActions>
 
			    </Dialog>
    		</div>
		);
	}
}


function mapStateToProps(state){
	return {
		user: state.currentUser,
		rooms: state.rooms,
		tags: state.tags
	}
}


export default connect(mapStateToProps)(StartConvo);