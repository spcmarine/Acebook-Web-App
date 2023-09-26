import React, { useState } from 'react';

const Comment = ({post, handleCommentSubmit, handleCreateComment, comment, commentInput}) => {
    // const [showForm, setShowForm] = useState(false);

    // const handleShowFormEvent = () => {
    //     setShowForm(!showForm);
    // }

    const handleCommentChange = (event) => {
        handleCreateComment(event);
    }

    const handleCommentEvent = (event) => {
        handleCommentSubmit(post._id);
    }

    return(
        <>
        <article> {comment.message}
        <form onSubmit={handleCommentEvent}>
        <input placeholder="Write your comment here" id="newComment" type="text" value={commentInput} onChange={handleCommentChange}/>
        <input id="submit" type="submit" value="Create Comment" />
        </form>
        </article>
        </>
    )

}

export default Comment;

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