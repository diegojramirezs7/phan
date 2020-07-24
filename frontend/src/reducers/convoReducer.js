export default function convo_reducer(state = "", action){
	const convoKey = action.payload ? action.payload.convoKey: null;
	var postKey = "";
	var upvotes = 0, downvotes = 0;
	var upvoted = false, downvoted = false;
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
			postKey = action.payload.postKey;
			upvotes = state.convos[convoKey].relatedPosts[postKey].upvotes;
			downvotes = state.convos[convoKey].relatedPosts[postKey].downvotes;
			upvoted = state.convos[convoKey].relatedPosts[postKey].relevantRels['upvoted'];
			downvoted = state.convos[convoKey].relatedPosts[postKey].relevantRels['downvoted'];
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relatedPosts: {
							...state.convos[convoKey].relatedPosts,
							[postKey]: {
								...state.convos[convoKey].relatedPosts[postKey],
								relevantRels: {
									...state.convos[convoKey].relatedPosts[postKey].relevantRels,
									downvoted: false,
									upvoted: !upvoted
								},
								upvotes: (upvoted)? upvotes - 1: upvotes + 1,
								downvotes: (downvoted)? downvotes - 1: downvotes
							}
						}
					}
				}
			}
		case 'DOWNVOTE_POST':
			postKey = action.payload.postKey;
			upvotes = state.convos[convoKey].relatedPosts[postKey].upvotes;
			downvotes = state.convos[convoKey].relatedPosts[postKey].downvotes;
			upvoted = state.convos[convoKey].relatedPosts[postKey].relevantRels['upvoted'];
			downvoted = state.convos[convoKey].relatedPosts[postKey].relevantRels['downvoted'];
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relatedPosts: {
							...state.convos[convoKey].relatedPosts,
							[postKey]: {
								...state.convos[convoKey].relatedPosts[postKey],
								relevantRels: {
									...state.convos[convoKey].relatedPosts[postKey].relevantRels,
									upvoted: false,
									downvoted: !downvoted
								},
								downvotes: (downvoted)? downvotes - 1: downvotes + 1,
								upvotes: (upvoted)? upvotes - 1: upvotes
							}
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
			const p_author = action.payload.postData["author"];
			const p_title = action.payload.postData["title"];
			const p_content = action.payload.postData["content"];
			postKey = action.payload.postData['key']

			console.log(postKey)
			console.log(action.payload.postData)
			//still need to change it 
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relatedPosts: {
							...state.convos[convoKey].relatedPosts,
							[postKey]: action.payload.postData
						}
					}
				}
			}
		case 'SET_USER':
			return state;
		case 'ADD_ROOM':
			const room = action.payload.room;
			return {
				...state,
				rooms: {
					...state.rooms,
					[room.key]: {
						key: room.key,
						relationship: room.relationship,
						title: room.name,
						visitors: room.visitors,
						description: room.description
					}
				}
			}
		default: 
			return state;
	}
}