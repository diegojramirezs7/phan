export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const SAVE_USER = 'SAVE_USER';

export function fetch_users_success(user_list){
	return ({
		type: FETCH_USERS_SUCCESS,
		payload: {
			users: user_list
		}
	})
}

export function save_user(userContent){
	return ({
		type: SAVE_USER,
		payload: {
			user: userContent
		}
	})
}
