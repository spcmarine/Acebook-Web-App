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
      <article data-cy="post" className='card d-flex text-center w-75 p-3 dark-blue-background' key={ post._id }>
        <div className="card mb-5 ml-5 mt-5 mr-5 shadow">
        <div className="col text-center text-indigo" >{post.message} </div>
        <div className="d-flex justify-content-start p-3 pb-0"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#cc8b86" class="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
</svg>
          <div className="text-indigo" >{post.likes}</div>
        </div>
        <div className="d-flex justify-content-end p-3 pt-0">
          <button className="btn btn-sm pink-background custom-shadow-1" style={{ width: '70px', height: '30px' }} onClick={handleLikeEvent}>
            Heart
          </button>
        </div>
        </div>
      </article>
    </div>
  )
}

export default Post;
