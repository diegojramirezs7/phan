export default function room_reducer(state="", action){
	var user = null;
	var users = null;
	var updatedUsers = null;

	switch (action.type){
		case 'SET_USER':
			return state;
		case 'FETCH_USERS_SUCCESS':
			users = action.payload.users;
			updatedUsers = {...state.people};
			users.forEach(user => {
				updatedUsers[user['key']] = user
			})
			return {
				...state,
				people: updatedUsers
			}
		case 'SAVE_USER':
			user = action.payload.user;
			return {
				...state,
				people: {
					...state.people,
					[user.key]: user
				}
			}
		default:
			return state;
	}
}










		