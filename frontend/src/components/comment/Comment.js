import React, { useState } from 'react';

const Comment = ({comment, handleLikeCommentSubmit, handleEditCommentSubmit, handleDeleteCommentSubmit}) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [editCommentInput, setEditCommentInput] = useState("");


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



    return(
        <article> {comment.message} Likes: {comment.likes}
        <button onClick={ handleLikeEvent }>Like</button>
        <button onClick={ handleViewEditForm }>Edit Comment</button>

        { showEditForm && 
            <form onSubmit={ handleEditCommentSubmitForm }>
            <input placeholder="Write your comment here" id="newComment" type="text" value={ editCommentInput } onChange={ handleEditCommentEvent }/>
            <input id="submit" type="submit" value="Submit" />
            </form>
        }

        <button onClick={ handleDeleteEvent }>Delete</button>
        </article>
    )
}

export default Comment;