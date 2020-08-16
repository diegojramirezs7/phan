export const CREATE_CONVO = 'CREATE_CONVO';
export const UPVOTE_CONVO = 'UPVOTE_CONVO';
export const DOWNVOTE_CONVO = 'DOWNVOTE_CONVO';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST ='DOWNVOTE_POST';
export const SAVE_CONVO= 'SAVE_CONVO';
export const REPLY_CONVO= 'REPLY_CONVO';
export const SHARE_CONVO = 'SHARE_CONVO';
export const FETCH_CONVOS_BEGIN = 'FETCH_CONVOS_BEGIN';
export const FETCH_CONVOS_SUCCESS = 'FETCH_CONVOS_SUCCESS';
export const FETCH_CONVOS_ERROR = 'FETCH_CONVOS_ERROR';
export const ADD_CONVO_BEGIN = 'ADD_CONVO_BEGIN';
export const ADD_CONVO_SUCCESS = 'ADD_CONVO_SUCCESS';
export const ADD_CONVO_ERROR = 'ADD_CONVO_ERROR';


export function upvote_convo(convoContent){
	return ({
		type: UPVOTE_CONVO,
		payload: {
			convo: convoContent
		}
	});
}

export function downvote_convo(convoContent){
	return ({
		type: DOWNVOTE_CONVO,
		payload: {
			convo: convoContent
		}
	})
}

export function save_convo(convoContent){
	return ({
		type: SAVE_CONVO,
		payload: { 
			convo: convoContent
		}
	})
}


export function reply_convo(convoId, postData){
	return({
		type: REPLY_CONVO,
		payload: {
			convoKey: convoId, 
			post: postData
		}
	})
}



export function upvote_post(convoId, postData){
	return ({
		type: UPVOTE_POST,
		payload: {
			convoKey: convoId,
			post: postData 
		}
	})
}

export function downvote_post(convoId, postData){
	return ({
		type: DOWNVOTE_POST,
		payload: { 
			convoKey: convoId,
			post: postData
		}
	})
}



// ------------------------------------- TO DO --------------------------------------- //
export function add_convo_begin(){
	return ({
		type: ADD_CONVO_BEGIN
	})
}

export function add_convo_success(convoContent){
	return ({
		type: ADD_CONVO_SUCCESS,
		payload: {
			convo: convoContent
		}
	})
}

export function add_convo_error(){
	return ({
		type: ADD_CONVO_ERROR
	})
}


export function fetchConvosBegin(){
	return ({
		type: FETCH_CONVOS_BEGIN
	})
}

export function fetchConvosSuccess(convoList){
	return ({
		type: FETCH_CONVOS_SUCCESS,
		payload: { 
			convos: convoList
		}
	})
}

export function fetchConvosError(){
	return ({
		type: FETCH_CONVOS_ERROR,
		payload: {
			count: 1
		}
	})
}


