import { useState, useEffect } from "react";
import React from 'react';

const Comment = ({comment, handleLikeCommentSubmit, handleEditCommentSubmit, handleDeleteCommentSubmit, token}) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [editCommentInput, setEditCommentInput] = useState("");
    const [userList, setUserList] = useState([]);
  
    useEffect(() => {
      if(token) {
        fetchUsers();
      }
    }, [])

    const handleViewEditForm = (event) => {
        if (showEditForm === false) {
            setShowEditForm(true);
        } else {
            setShowEditForm(false);
        }
    }

    const handleLikeEvent = () => {
        handleLikeCommentSubmit(comment);
    }


    const handleEditCommentEvent = (event) => {
        setEditCommentInput(event.target.value);
    }


    const handleEditCommentSubmitForm = (event) => {
        event.preventDefault()

        handleEditCommentSubmit(editCommentInput, comment);
        setEditCommentInput('');
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
            const filteredUsers = data.user.filter((user) => user._id === comment.user_id)
            setUserList(filteredUsers);
            
          })
      }


    return(
        <article className="modal-body"> {userList.length > 0 && <p className='text-dark'> <img className='profileImage' src={userList[0].profileURL} alt= "profile image" title='User Image'/> {userList[0].firstName} {userList[0].lastName}</p>} {comment.message} Likes: {comment.likes}
        <div className="fluid-container">
          <button className="pink-background btn shadow mood pill change" onClick={ handleLikeEvent }>Like</button>
          <button className="dark-blue-background btn shadow mood pill change" onClick={ handleViewEditForm }>Edit Comment</button>

          { showEditForm && 
              <form onSubmit={ handleEditCommentSubmitForm }>
              <input placeholder="Write your comment here" id="newComment" type="text" value={ editCommentInput } onChange={ handleEditCommentEvent }/>
              <input id="submit" type="submit" value="Submit" />
              </form>
          }

          <button className="light-blue-background btn shadow mood pill change"  onClick={ handleDeleteEvent }>Delete</button>
        </div>
        </article>
    )
}

export default Comment;