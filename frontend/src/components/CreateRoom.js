import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

//optional
import { makeStyles } from '@material-ui/core/styles';


class CreateRoom extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			active: false, 
			title: "",
			description: "",
		};
	}

	handleToggle(){
		this.setState({
			active: !this.state.active,
			title: "",
			description: ""
		});
	}

	shareConvo(){
	}

	handleTitleChange(e){
		this.setState({
			title: e.target.value
		});
	}

	handleDescriptionChange(e){
		this.setState({
			description: e.target.value
		});
	}

	render(){
		const tfStyle = {
			marginBottom: "2vh"
		};

		return(
			 <div className="col-md-9 startConvo" style={{ background: "#fff"}}>
    			<Link to="#" style={{display: "flex", alignItems: "center", color: "#5f5f5f",}}>
    				<Avatar>
        				<AccountCircleIcon />
      				</Avatar>
      				<span> Diego Ramirez</span>
    			</Link>

    			<TextField 
    				placeholder="Create a Conversation Room"
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
			        style={{position: "absolute", top: "0px"}}
			    >
				    <DialogTitle>Create A Conversation Room</DialogTitle>
				    <DialogContent dividers={true}>
				    	<TextField 
	    					placeholder="Room Name"
			    			fullWidth
			    			style={tfStyle}
			    			value={this.state.title}
			    			onChange={(e)=>this.handleTitleChange(e)}
	    				/>
	    				<TextField
				          	id="standard-multiline-static"
				          	fullWidth
				         	multiline
				          	rows={4}
				          	placeholder="Short Description"
				          	style={tfStyle}
				          	value={this.state.description}
			    			onChange={(e)=>this.handleDescriptionChange(e)}
				        />

				    </DialogContent>
				    <DialogActions>
	          			<Button style={{background: "#5f5f5f", color: "#fff"}} variant="contained">
	            			Create
	          			</Button>
	       		 	</DialogActions>
 
			    </Dialog>
    		</div>
		);
	}
}

export default CreateRoom;