import React from 'react';
import {useParams} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

function ConvoPage(props){
	const { convo_url } = useParams();

	return (
		<div className="container content">
			<Card className="convoCard" >
				<CardContent className="convo-content" style={{paddingBottom: "4px"}}>
					{convo_url}
				</CardContent>
				<CardActions className="convoFooter" style={{paddingTop: "0px"}}>

				</CardActions>
			</Card>
		</div>
	);
}

export default ConvoPage;