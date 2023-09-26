import React from 'react';
import './Post.css'

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
    <div className="container d-flex justify-content-center align-items-center p-4 website-font">
      <article data-cy="post" className='card d-flex text-center w-75 p-3 .background-indigo' key={ post._id }>
        <div className="card mb-5 ml-5 mt-5 mr-5 shadow">
        <div className="col text-center text-indigo" >{post.message} </div>
        <div className="d-flex justify-content-start p-3 pb-0"> 
          <div className="text-primary" >{post.likes} 💙</div>
        </div>
        <div className="d-flex justify-content-end p-3 pt-0">
          <button className="btn btn-danger btn-sm" style={{ width: '70px', height: '30px' }} onClick={handleLikeEvent}>
            Heart
          </button>
        </div>
        </div>
      </article>
    </div>
  )
}

export default Post;
