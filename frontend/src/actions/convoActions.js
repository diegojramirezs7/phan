export const UPVOTE_CONVO = 'UPVOTE_CONVO';
export const DOWNVOTE_CONVO = 'DOWNVOTE_CONVO';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST ='DOWNVOTE_POST';
export const SAVE_CONVO= 'SAVE_CONVO';
export const SHARE_CONVO = 'SHARE_CONVO';
export const FETCH_CONVOS_BEGIN = 'FETCH_CONVOS_BEGIN';
export const FETCH_CONVOS_SUCCESS = 'FETCH_CONVOS_SUCCESS';
export const FETCH_CONVOS_ERROR = 'FETCH_CONVOS_ERROR';

export function upvote_convo(convoId){
	return ({
		type: UPVOTE_CONVO,
		payload: {
			convoKey: convoId
		}
	});
}

export function downvote_convo(convoId){
	return ({
		type: DOWNVOTE_CONVO,
		payload: {
			convoKey: convoId
		}
	})
}

export function upvote_post(convoId, postId){
	return ({
		type: UPVOTE_POST,
		payload: {
			convoKey: convoId,
			postKey: postId 
		}
	})
}

export function downvote_post(convoId, postId){
	return ({
		type: DOWNVOTE_POST,
		payload: { 
			convoKey: convoId,
			postKey: postId
		}
	})
}

export function save_convo(convoId){
	return ({
		type: SAVE_CONVO,
		payload: { 
			convoKey: convoId 
		}
	})
}

export function share_convo(){
	return ({
		type: SHARE_CONVO,
		payload: { 
			count: 1 
		}
	})
}

export function fetchConvosBegin(){
	return ({
		type: FETCH_CONVOS_BEGIN,
		payload: { 
			count: 1 
		}
	})
}

export function fetchConvosSuccess(){
	return ({
		type: FETCH_CONVOS_SUCCESS,
		payload: {
			count: 1
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


