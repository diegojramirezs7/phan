import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import RelatedPosts from './RelatedPosts';
import ConvoStarter from './ConvoStarter';
import ConvoFooter from './ConvoFooter';
//import {connect} from 'react-redux';

function ConvoCard(props){
	return (
		<Card className="convoCard">
			<CardContent>
				<ConvoStarter header={props.convo.convoStarter} convoKey={props.convo.key}/>
			    <RelatedPosts
			    	posts={props.convo.relatedPosts} 
			    	convoKey={props.convo.key}
				/>
			</CardContent>
			<CardActions className="convoFooter">
			    <ConvoFooter footer={props.convo.convoFooter} convoKey={props.convo.key} />
			</CardActions>
		
		</Card>
	);
}

export default ConvoCard;