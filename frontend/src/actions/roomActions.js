export const FETCH_ROOM_CONVOS_SUCCESS = 'FETCH_ROOM_CONVOS_SUCCESS';
export const ADD_ROOM = 'ADD_ROOM';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const SAVE_ROOM = 'SAVE_ROOM';

export function fetch_room_convos_success(convo_list){
	return ({
		type: FETCH_ROOM_CONVOS_SUCCESS,
		payload: {
			convos: convo_list
		}
	})
}

export function add_room(roomContent){
	return ({
		type: ADD_ROOM,
		payload: {
			room: roomContent
		}
	})
}


export function fetch_rooms_success(room_list){
	return ({ 
		type: FETCH_ROOMS_SUCCESS,
		payload: {
			rooms: room_list
		}
	})
}

export function save_room(roomContent){
	return ({
		type: SAVE_ROOM,
		payload: {
			room: roomContent
		}
	})
}