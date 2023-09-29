import { useState, useEffect } from "react";
import React from 'react';

const Comment = ({comment, handleLikeCommentSubmit, handleDeleteCommentSubmit, token}) => {

const [userList, setUserList] = useState([]);

useEffect(() => {
    if(token) {
      fetchUsers();
    }
  }, [])

    const handleLikeEvent = () => {
        handleLikeCommentSubmit(comment)
    }

    const handleDeleteEvent = () => {
        handleDeleteCommentSubmit(comment);
    }

    const fetchUsers = () => {
        fetch("/users", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            console.log(data)
            const filteredUsers = data.user.filter((user) => user._id === comment.user_id)
    
            console.log(filteredUsers)
            setUserList(filteredUsers);
            
          })
      }
    

    return(
        <article> {userList.length > 0 && <p className='text-dark'> <img className='profileImage' src={userList[0].profileURL} alt= "profile image" title='User Image'/> {userList[0].firstName} {userList[0].lastName}</p>} {comment.message} Likes: {comment.likes}
        <button className='btn btn-success'onClick={ handleLikeEvent }>Like</button>
        <button className='btn btn-danger'onClick={ handleDeleteEvent }>Delete</button>
        </article>
    )
}

export default Comment;