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
    <article data-cy="post" className='card d-flex text-center' key={ post._id }>
      <div className="card mb-5 ml-5 mt-5 mr-5 shadow">
      <div className="col" >{post.message}</div>
      <div className="col text-primary" >{post.likes} 💙</div>
      <button className="btn btn-danger" onClick={handleLikeEvent}>Heart</button>
      </div>
    </article>
  )
}

export default Post;
