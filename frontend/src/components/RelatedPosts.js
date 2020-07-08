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
						key={posts[postId].key}
						author={posts[postId].author}
						title={posts[postId].title}
						content={posts[postId].content}
						upvotes={posts[postId].upvotes}
						downvotes={posts[postId].downvotes}
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