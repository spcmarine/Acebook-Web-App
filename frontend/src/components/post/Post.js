import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" role="article" key={ post._id }>{ post.message }</article>
  )
}

export default Post;
