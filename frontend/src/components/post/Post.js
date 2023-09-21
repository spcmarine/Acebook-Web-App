import React from 'react';

const Post = ({post, handleLikeSubmit}) => {
  // We have to destructure the handleLikeSubmit because we cannot call a function
  // from a parent component passed down
  // We have to define a new function which handles the event of the button
  // being pressed and then call the parent component function
  // We can also pass in post as that has been destructured as well for us to use on Line 3

  const handleLikeEvent = (event) => {
    handleLikeSubmit(post)
  }

  return(
    <article data-cy="post" key={ post._id }>{ post.message } Likes: {post.likes} 
    <button onClick={handleLikeEvent}>Like button</button>
    </article>
  )
}

export default Post;
