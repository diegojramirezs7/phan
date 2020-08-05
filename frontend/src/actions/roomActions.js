export const FETCH_CONVOS_SUCCESS = 'FETCH_CONVOS_SUCCESS';

export function fetch_convos_success(convo_list){
	return ({
		type: FETCH_CONVOS_SUCCESS,
		payload: {
			convos: convo_list
		}
	})
}