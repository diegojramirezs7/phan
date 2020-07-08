import React from 'react';
//import RoomCard from './RoomCard';
//import CreateRoom from './CreateRoom';
import Grid from '@material-ui/core/Grid';

class Rooms extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			rooms: [
				{
					key: '1',
          			title: "US Politics",
          		    description: "Everything related to US politics, democrats, republicans, the president and congress."
				},
				{
					key: '2',
          			title: "Technology",
          		    description: "Computers, Software, Engineering, and all that good stuff related to Technology."
				},
				{
					key: '3',
          			title: "Literature",
          		    description: "English Literature, Poetry, Prominent Writers and Scholarly Papers of our time."
				},
				{
					key: '4',
          			title: "Soccer",
          		    description: "Discussions on Transfer Markets, Upcoming Games, etc."
				},
				{
					key: '5',
          			title: "Social Activism",
          		    description: "Black Lives Matter, Feminism, LGBTQ+, Social Inequalities, and Minorities."
				},
				{
					key: '6',
          			title: "Quantum Mechanics",
          		    description: "Subatomic Particles, Quantum Entanglement, Superposition, and possible Multiverse."
				},
				{
					key: '7',
          			title: "Show Biz",
          		    description: "TV Series, Movies, Celebrities, Influencers and anything related to entertainment."
				}

			]
		}
	}

	render(){
		return (
			<div className="container content">
				
				<Grid container spacing={1}>
					{this.state.rooms.map(room=>
						<Grid key={room.key} item>
							
						</Grid>
					)}
				</Grid>
			</div>
		);
	}
	
}

export default Rooms;