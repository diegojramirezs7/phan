export default function convo_reducer(state = "", action){
	const convoKey = action.payload ? action.payload.convoKey: null;
	var postKey = "";
	var convo = null;
	var convo_content = null;

	switch(action.type){
		case 'FETCH_CONVOS_SUCCESS':
			const convos = action.payload.convos;
			const updatedConvos = {...state.convos};
			convos.forEach(convo => {
				updatedConvos[convo['key']] = convo
			})
			return {
				...state,
				convos: updatedConvos
			}
		case 'ADD_CONVO_SUCCESS':
			convo_content = action.payload.convo;
			return {
				...state,
				convos: {
					[convo_content.key]: convo_content,
					...state.convos
				}
			}
		case 'UPVOTE_CONVO':
			convo = action.payload.convo;
			return {
				...state,
				convos: {
					...state.convos,
					[convo.key]: convo
				}
			}
		case 'DOWNVOTE_CONVO':
			convo = action.payload.convo;
			return {
				...state,
				convos: {
					...state.convos,
					[convo.key]: convo
				}
			}

		case 'UPVOTE_POST':
			postKey = action.payload.post['key']
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relatedPosts: {
							...state.convos[convoKey].relatedPosts,
							[postKey]: action.payload.post
						}
					}
				}
			}
		case 'DOWNVOTE_POST':
			postKey = action.payload.post['key'];
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relatedPosts: {
							...state.convos[convoKey].relatedPosts,
							[postKey]: action.payload.post
						}
					}
				}
			}
		case 'SAVE_CONVO':
			convo = action.payload.convo;
			return {
				...state,
				convos: {
					...state.convos,
					[convo.key]: convo
				}	
			}
		case 'REPLY_CONVO':
			postKey = action.payload.post['key']

			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relatedPosts: {
							...state.convos[convoKey].relatedPosts,
							[postKey]: action.payload.post
						}
					}
				}
			}
		default:
			return state;
	}
}