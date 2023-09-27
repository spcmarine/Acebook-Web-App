import React from 'react';

const Comment = ({comment, handleLikeCommentSubmit}) => {

    const handleLikeEvent = () => {
        handleLikeCommentSubmit(comment)
    }

    return(
        <article> {comment.message} Likes: {comment.likes}
        <button onClick={handleLikeEvent}>Like</button>
        </article>
    )
}

export default Comment;