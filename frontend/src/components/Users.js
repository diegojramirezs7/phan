import React from 'react';
import UserCard from './UserCard';
import {connect} from 'react-redux';
import * as actions from '../actions/convoActions';
import axios from 'axios';

class Users extends React.Component{
	
	constructor(props){
		super(props);
	}

	fetchUsers(){
		axios.get("http://localhost:8000/api/users/", {
			headers: {
				'User-Key': this.props.user['key']
			}
		})
		.then(response => {
			const users = response['data'];
	 		this.props.dispatch(actions.fetch_users_success(users));
		})
		.catch(error => {
			console.log(error);
		})
	}

	componentDidMount(){
		this.fetchUsers();
		console.log(this.props.users);
	}

	render(){
		const users = this.props.users;
		return (
			<div className="container content">
				{
					Object.keys(users).map(userKey => (
						<UserCard key={userKey} user={users[userKey]} userKey={userKey} />
					))
				}
			</div>
		);
	}
	
}

function mapStateToProps(state){
	return {
		users: state.people,
		user: state.currentUser
	};
}

export default connect(mapStateToProps)(Users);