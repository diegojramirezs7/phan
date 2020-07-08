import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function NotificationsDD(props){
	return (
		<Menu
	    	anchorEl={props.anchorElem}
	      	anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
	      	id={props.menuId}
	      	keepMounted
	      	transformOrigin={{ vertical: 'top', horizontal: 'right' }}
	      	open={props.isMenuOpen}
	      	onClose={() => props.onClose()}
	    >
      		<MenuItem onClick={props.handleMenuClose}>Someone Upvoted your post</MenuItem>
      		<MenuItem onClick={props.handleMenuClose}>Thomas Edison posted on your convo</MenuItem>
      		<MenuItem onClick={props.handleMenuClose}>Nikola Tesla downvoted your convo</MenuItem>
    	</Menu>
	);
}

export default NotificationsDD;