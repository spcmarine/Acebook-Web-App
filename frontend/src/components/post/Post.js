import Feed from '../feed/Feed.js';
import React, { useEffect, useState } from 'react';
import Comment from '../comment/Comment.js'
import './Post.css'

const Post = ({post, handleLikeSubmit, handleEditPostSubmit, handleDeletePostSubmit, token, setToken}) => {
  const [commentInput, setCommentInput] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [userList, setUserList] = useState([]);
  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const [editPostInput, setEditPostInput] = useState("");


  useEffect(() => {
    if(token) {
      fetchComments();
    }
  }, [])


  useEffect(() => {
    if(token) {
      fetchUsers();
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


  const fetchUsers = () => {
    fetch("/users", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(async data => {
        // console.log(data)
        const filteredUsers = data.user.filter((user) => user._id === post.user)
        

        // console.log(filteredUsers)
        // console.log(filteredCommentUsers)
        setUserList(filteredUsers);
        
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
          alert('Error: Please enter a message');
          console.log('Something went wrong, comment was not added');
        }
      })
    }
  }


  const handleViewCommentsEvent = (event) => {
    if (showComments === false) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  }


  const handleViewEditPostForm = (event) => {
    if (showEditPostForm === false) {
        setShowEditPostForm(true);
    } else {
        setShowEditPostForm(false);
    }
  }


  const handleEditPostEvent = (event) => {
    setEditPostInput(event.target.value);
  }


  const handleEditPostSubmitForm = (event) => {
    event.preventDefault()

    handleEditPostSubmit(editPostInput, post);
    setEditPostInput('');
  }


  const handleCommentEvent = (event) => {
      event.preventDefault()

      handleCommentSubmit(post._id);
      setCommentInput('');
      setShowComments(true);
  }


  const handleCreateComment = (event) => {
    setCommentInput(event.target.value)
  }


  const handleLikeCommentSubmit = async (commentObject) => {
    if(token) {
      fetch('/comments', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likedComment: commentObject })
        }).then(response => {
          if(response.status === 201) {
            fetchComments()
            console.log('Like property has been incremented')
          } else {
            console.log('Something went wrong when trying to increment likes')
          }
      })
    }
  }



  const handleEditCommentSubmit = async (newComment, commentObject) => {
    if(token) {
      fetch("/comments/comments", {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: newComment, comment: commentObject })
      }).then(response => {
        if(response.status === 201) {
          fetchComments();
          console.log('Comment has been successfully edited');
        } else {
          alert('Error: Please enter a message');
          console.log('Something went wrong, comment was not edited');
        }
      })
    }
  }



  const handleDeleteCommentSubmit = async (commentObject) => {
    if(token) {
      fetch('/comments', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment: commentObject, token: token})
      }).then(response => {
        if(response.status === 201) {
          fetchComments()
          console.log('Comment has been deleted')
        } else {
          console.log('Something went wrong when trying to delete a comment')
        }
      })
    }
  }


  const handleDeleteEvent = () => {
    handleDeletePostSubmit(post);
  }



  return(
  
  <div className="container d-flex justify-content-center align-items-center p-4 website-font">
      <article data-cy="post" className='card d-flex text-center w-75 p-3 dark-blue-background' key={ post._id } > 
      {userList.length > 0 && <p className='text-light'> <img className='profileImage' src={userList[0].profileURL} alt= "profile image" title='User Image'/> {userList[0].firstName} {userList[0].lastName}</p>}
        <div className="card mb-5 ml-5 mt-5 mr-5 shadow">
          <img className="post-image mx-auto" alt="uploaded" src={ post.image_url } />
        <div className="col text-center text-indigo" >{post.message} </div>
        <div className="d-flex justify-content-start p-3 pb-0"> 
        
        </div>
        <div className="modal-body">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#cc8b86" class="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
        </svg>
        <div className="pink" >{post.likes}</div>
        <div className="d-flex justify-content-end p-3 pt-0">
          <button className="btn btn-sm pink-background custom-shadow-1 pill change" onClick={handleLikeEvent}>
            Heart
          </button>
          </div>

          <div className="modal-body">
            <div className='fluid-container'>
          <button className="light-blue-background btn shadow mood pill change" onClick={ handleViewEditPostForm }>Edit</button>
          
          { showEditPostForm && 
            <form onSubmit={ handleEditPostSubmitForm }>
            <input placeholder="Write your post here" id="newPost" type="text" value={ editPostInput } onChange={ handleEditPostEvent }/>
            <input className="btn btn-light tdr shadow-pink shadow mood change" id="submit" type="submit" value="Submit" />
            </form>
          }

          <button className="btn dark-blue-background shadow mood pill change" onClick={ handleDeleteEvent }>Delete</button>
          </div>
          </div>
          <div className="modal-body">
          <div class="container-fluid">
          <form onSubmit={handleCommentEvent}>
                <input placeholder="Write your comment here" id="newComment" type="text" value={commentInput} onChange={handleCreateComment}/>
                <input className='btn pink-background change' id="submit" type="submit" value="Create Comment"  />
            </form>

          <button className="col btn btn-light tdr shadow-pink mood change" onClick={ handleViewCommentsEvent }>Comments</button>
          
                
            { showComments && (
          commentList.map (
            (comment) => {return <Comment post={ post } key= { comment._id } handleCommentSubmit={ handleCommentSubmit } handleCreateComment={ handleCreateComment } comment={ comment } commentInput={ commentInput } handleLikeCommentSubmit={ handleLikeCommentSubmit } handleEditCommentSubmit={handleEditCommentSubmit} handleDeleteCommentSubmit={ handleDeleteCommentSubmit } token = { token }/>}
            )
          )}
             
          </div>
          </div>
        </div>
        </div>
      </article>
    </div>
  )
}

export default Post;
