import React, { useEffect, useState } from 'react';
import Comment from '../comment/Comment.js'

const Post = ({post, handleLikeSubmit, token, setToken}) => {
  const [commentInput, setCommentInput] = useState("");
  const [commentList, setCommentList] = useState([]); 

  // We have to destructure the handleLikeSubmit because we cannot call a function
  // from a parent component passed down
  // We have to define a new function which handles the event of the button
  // being pressed and then call the parent component function
  // We can also pass in post as that has been destructured as well for us to use on Line 3

  useEffect(() => {
    if(token) {
      fetchComments();
    }
  }, [])

  const fetchComments = () => {
    fetch("/comments", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))

        const filteredComments = data.comments.filter((comment) => comment.post_id === post._id)
        setCommentList(filteredComments.reverse());
      })
  } 

  
  const handleLikeEvent = (event) => {
    handleLikeSubmit(post)
  }

  const handleCommentSubmit = async (post_id) => {
    if(token) {
      fetch("/comments", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: commentInput, post_id: post_id })
      }).then(response => {
        if(response.status === 201) {
          fetchComments();
          console.log('Comment has been successfully added');
        } else {
          console.log('Something went wrong, comment was not added');
        }
      })
    }
  }

  // const handleCommentChange = (event) => {
  //   handleCreateComment(event);
  // }

  const handleCommentEvent = (event) => {
    event.preventDefault()
    
    handleCommentSubmit(post._id);
    setCommentInput('');
  }


  const handleCreateComment = (event) => {
    setCommentInput(event.target.value)
  }


  return(
    <article data-cy="post" key={ post._id }>{ post.message } Likes: { post.likes } 
    <button onClick={ handleLikeEvent }>Like button</button>
    
    {commentList.map (
      (comment) => {return <Comment post={ post } key= { comment._id } handleCommentSubmit={ handleCommentSubmit } handleCreateComment={ handleCreateComment } comment={ comment } commentInput={ commentInput } />}
    )}
  
    <form onSubmit={handleCommentEvent}>
        <input placeholder="Write your comment here" id="newComment" type="text" value={commentInput} onChange={handleCreateComment}/>
        <input id="submit" type="submit" value="Create Comment" />
    </form>
    </article>
  )
}

export default Post;
