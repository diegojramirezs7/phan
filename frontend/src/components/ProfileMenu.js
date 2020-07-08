import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function ProfileMenu(props){
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
      		<MenuItem onClick={props.handleMenuClose}>Profile</MenuItem>
      		<MenuItem onClick={props.handleMenuClose}>My Conversations</MenuItem>
      		<MenuItem onClick={props.handleMenuClose}>Settings</MenuItem>
    	</Menu>
	);
}

export default ProfileMenu;