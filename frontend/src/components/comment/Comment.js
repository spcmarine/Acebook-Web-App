import React from 'react';

const Comment = ({post, comment, handleCommentSubmit}) => {
    const handleCommentEvent = (event) => {
        handleCommentSubmit(comment)
    }

    return(
        <form> 
        <input placeholder="Write your comment here" id="newComment" type="text"/>
        <input id="submit" type="submit" value="Create Comment" />
        </form>
    )



}

/* <form onSubmit={handleSubmit} className="d-inline-flex" >
<input placeholder="Write your message here" className="form-control" id="newPost"  type="text" value= { message } onChange={handleCreatePost}/> 
<input id="submit" type="submit" className="btn btn-primary" value="Create Post" />

</form> */











// const Post = ({post, handleLikeSubmit}) => {
  
//     const handleLikeEvent = (event) => {
//       handleLikeSubmit(post)
//     }
  
//     return(
//       <article data-cy="post" key={ post._id }>{ post.message } Likes: {post.likes} 
//       <button onClick={handleLikeEvent}>Like button</button>
//       </article>
//     )
//   }
  
//   export default Post;