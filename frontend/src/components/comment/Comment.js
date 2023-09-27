import React, { useState } from 'react';

const Comment = ({comment, handleLikeCommentSubmit, handleDeleteCommentSubmit}) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [editComment, setEditComment] = useState('')


    const handleViewEditForm = (event) => {
        if (showEditForm === false) {
          setShowEditForm(true);
        } else {
          setShowEditForm(false);
        }
      }

    const handleLikeEvent = () => {
        handleLikeCommentSubmit(comment)
    }

    const handleDeleteEvent = () => {
        handleDeleteCommentSubmit(comment);
    }

    return(
        <article> {comment.message} Likes: {comment.likes}
        <button onClick={ handleLikeEvent }>Like</button>
        <button onClick={ handleViewEditForm }>Edit Comment</button>

        { showEditForm && 
            <form onSubmit={handleEditCommentEvent}>
            <input placeholder="Write your comment here" id="newComment" type="text" value={editCommentInput} onChange={handleEditComment}/>
            <input id="submit" type="submit" value="Create Comment" />
            </form>
        }

        <button onClick={ handleDeleteEvent }>Delete</button>
        </article>
    )
}

export default Comment;