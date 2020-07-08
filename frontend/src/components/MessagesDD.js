import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function MessagesDD(props){
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
      		<MenuItem onClick={props.handleMenuClose}>
      			What do you think you're doing cunt?
      		</MenuItem>
      		<MenuItem onClick={props.handleMenuClose}>
      			Why are talking about that, don't you see it harmful?
      		</MenuItem>
      		<MenuItem onClick={props.handleMenuClose}>
      			Love your convos bro, keep at it.
      		</MenuItem>
    	</Menu>
	);
}

export default MessagesDD;