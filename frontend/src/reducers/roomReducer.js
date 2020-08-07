export default function room_reducer(state="", action){
	var room = null;
	var rooms = null;
	var updatedRooms = null;

	switch (action.type){
		case 'ADD_ROOM':
			room = action.payload.room;
			return {
				...state,
				rooms: {
					...state.rooms,
					[room.key]: room
				}
			}
		case 'SAVE_ROOM':
			room = action.payload.room;
			return {
				...state,
				rooms: {
					...state.rooms,
					[room.key]: room
				}
			}
		case 'FETCH_ROOMS_SUCCESS':
			rooms = action.payload.rooms;
			updatedRooms = {...state.rooms};
			rooms.forEach(room => {
				updatedRooms[room['key']] = room
			})
			return {
				...state,
				rooms: updatedRooms
			}
		default:
			return state;
	}
}

