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
			selectedRooms: []
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

	handleToggle(){
		this.setState({
			active: !this.state.active,
			imageUploaded: false, 
			premise: "",
			explanation: ""
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
			premise: e.target.value
		});
	}

	handleExplanationChange(e){
		this.setState({
			explanation: e.target.value
		});
	}

	handleAutocomplete(ev, values, opt){
		//every change in the autocomplete box, we get all the values
		//we add all the keys of the values we get
		this.setState({
			selectedRooms: values
		});
	}

	add_convo = e => {
		e.preventDefault();
		// this.state is the body of the post request
		axios.post("/url", this.state).then(() => {
			this.props.resetState();
			this.props.toggle();
		})
	}

	// -------------------- Fetching and Updating (API interactino) ------------------- //

	shareConvo(){
		//this.props(dispatch(actions.add_convo_begin()))

		const convoContent = {
			userKey: this.props.user['key'],
			title: this.state.premise,
			author: this.props.user['name'],
			mainroom: this.state.selectedRooms[0],
			rooms: this.state.selectedRooms,
			hasImage: false,
			image: "",
			content: this.state.explanation
		}

		this.send_convo(convoContent)
		//this.fetchConvos();

		this.handleToggle();
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
  	};


	render(){
		const imageStyle = {
			width: "100%",
			height: "25vh",
			margin: "2vh auto",
			textAlign: "center",
			display: "block"
		};
		const tfStyle = {
			marginBottom: "2vh"
		};

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
							id="tags-standard"
							multiple
						    options={this.rooms.map((option) => option.title)}
						  	fullWidth
						  	freeSolo
						  	onChange={(event, value, opt)=>this.handleAutocomplete(event, value, opt)}
						  	renderTags={(value, getTagProps) =>
					          value.map((option, index) => (
					            <Chip label={option} {...getTagProps({ index })} />
					          ))
					        }
						  	renderInput={(params) => 
						  		<TextField {...params} label="Post in Room" variant="outlined" style={tfStyle}
						  		/>
						  	}
						/>

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
		user: state.currentUser
	}
}


export default connect(mapStateToProps)(StartConvo);

