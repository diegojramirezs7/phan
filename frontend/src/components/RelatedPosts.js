import React from 'react';
import Post from './Post';

function RelatedPosts(props){
	//const bottom = (props.posts.length > 2) ? <button className="btn btn-link">Load More Posts</button> : ""; 
	const posts = props.posts;
	
	return (
		<div className="relatedPosts">
			{
				Object.keys(posts).map(postId => (
					<Post 
						key={postId}
						author={posts[postId].author}
						title={posts[postId].title}
						content={posts[postId].content}
						upvotes={posts[postId].upvotes}
						downvotes={posts[postId].downvotes}
						postKey={posts[postId].key}
						convoKey={props.convoKey}
					/>
				))
			}
			{
				//bottom
			}
		</div>
	);
}

export default RelatedPosts;