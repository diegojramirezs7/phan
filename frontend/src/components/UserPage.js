import React, { useLayoutEffect } from 'react';
import {useParams} from "react-router-dom";
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ConvoCard from './ConvoCard';
import {save_user} from '../actions/userActions';
import {fetchConvosSuccess} from '../actions/convoActions';
import axios from 'axios';
import {connect} from 'react-redux';
import {capitalize} from '../helpers/stringManipulation';

function UserPage(props){
	const { user_url } = useParams();
	const {conversations, user, dispatch} = props;

	useLayoutEffect(() => {
		async function fetchUser(){
    		axios.get(`http://localhost:8000/api/user/${user_url}`, {
    			headers: {
    				'User-Key': user['key']
    			}
    		}).then(response => {
    			console.log(response['data']);
    			//dispatch(fetch_convos_success(response.data.convos));
    			//
    			dispatch(save_user(response.data));
    		}).catch(error => {
    			console.log(error);
    		})
		}
		
		fetchUser();
	}, [user, dispatch, user_url]);


	useLayoutEffect(() => {
		async function fetchConvos(){
			axios.get(`http://localhost:8000/api/convos?author=${user.key}`, {
				headers: {
					'User-Key': user['key']
				}
			}).then(response => {
				dispatch(fetchConvosSuccess(response.data));
			}).catch(error => {
				console.log(error);
			})
		}

		fetchConvos();
	}, [user, dispatch])

	return (
		<div className="container content">
			<Card className="convoCard" >
				<CardContent className="convo-content" style={{paddingBottom: "4px"}}>
					<h2>
						{
							Object.keys(props.users).filter(userId => props.users[userId].url === `/users/${user_url}`)
							.map(userId => (
								capitalize(props.users[userId].name)

							))
						}
					</h2>
					<p>
						{
							Object.keys(props.users).filter(userId => props.users[userId].url === `/users/${user_url}`)
							.map(userId => (
								props.users[userId].bio
							))
						}
					</p>
				</CardContent>
			</Card>
			{
				Object.keys(conversations).filter(conversationId => (
					conversations[conversationId].convoStarter.author.url === `/users/${user_url}`
				)).map(conversationId => (
					<ConvoCard key={conversationId} convo={conversations[conversationId]} />
				))
			}
		</div>
	);
}

function mapStateToProps(state){
	return {
		conversations: state.convo_reducer.convos,
		user: state.user_reducer.currentUser,
		users: state.user_reducer.people
	};
}

export default connect(mapStateToProps)(UserPage);