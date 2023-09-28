import React from 'react';

const Comment = ({comment, handleLikeCommentSubmit, handleDeleteCommentSubmit}) => {

    const handleLikeEvent = () => {
        handleLikeCommentSubmit(comment)
    }

    const handleDeleteEvent = () => {
        handleDeleteCommentSubmit(comment);
    }

    return(
        <article> {comment.message} Likes: {comment.likes}
        <button className='btn btn-success'onClick={ handleLikeEvent }>Like</button>
        <button className='btn btn-danger'onClick={ handleDeleteEvent }>Delete</button>
        </article>
    )
}

export default Comment;