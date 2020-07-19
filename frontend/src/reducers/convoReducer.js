export default function convo_reducer(state = "", action){
	const convoKey = action.payload ? action.payload.convoKey: null;
	var postKey = "";
	var upvotes = 0, downvotes = 0;
	var upvoted = false, downvoted = false;
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
					...state.convos,
					[convo_content.key]: convo_content
				}
			}
		case 'UPVOTE_CONVO':
			upvotes = state.convos[convoKey].convoFooter.upvotes;
			downvotes = state.convos[convoKey].convoFooter.downvotes;
			upvoted = state.convos[convoKey].relevantRels['upvoted'];
			downvoted = state.convos[convoKey].relevantRels['downvoted'];
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relevantRels: {
							...state.convos[convoKey].relevantRels,
							upvoted: !upvoted,
							downvoted: false,
						},
						convoFooter: {
							...state.convos[convoKey].convoFooter,
							upvotes: (upvoted)? upvotes - 1: upvotes + 1,
							downvotes: (downvoted) ? downvotes - 1: downvotes
						}
					} 
				}
			}
		case 'DOWNVOTE_CONVO':
		 	downvotes = state.convos[convoKey].convoFooter.downvotes;
		 	upvotes = state.convos[convoKey].convoFooter.upvotes;
		 	upvoted = state.convos[convoKey].relevantRels['upvoted'];
		 	downvoted = state.convos[convoKey].relevantRels['downvoted'];
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relevantRels: {
							...state.convos[convoKey].relevantRels,
							upvoted: false,
							downvoted: !downvoted,
						},
						convoFooter: {
							...state.convos[convoKey].convoFooter,
							downvotes: (downvoted)? downvotes - 1: downvotes + 1,
							upvotes: (upvoted)? upvotes - 1: upvotes
						}
					}
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
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relevantRels: {
							...state.convos[convoKey].relevantRels,
							saved: (state.convos[convoKey].relevantRels.saved)?false : true
						}
					}
				}	
			}
		case 'REPLY_CONVO':
			const p_author = action.payload.postData["author"];
			const p_title = action.payload.postData["title"];
			const p_content = action.payload.postData["content"];

			//still need to change it 
			return {
				...state,
				convos: {
					...state.convos,
					[convoKey]: {
						...state.convos[convoKey],
						relatedPosts: {
							...state.convos[convoKey].relatedPosts,
							[p_title]: {
								key: p_title,
								author: p_author,
								title: p_title,
								content: p_content,
								relevantRels: {},
								upvotes: 0,
								downvotes: 0
							}
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