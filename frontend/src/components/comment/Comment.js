import React from 'react';

const Comment = ({comment}) => {
    return(
        <article> {comment.message} </article>
    )
}

export default Comment;