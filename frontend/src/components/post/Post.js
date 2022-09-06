import React from 'react';

const Post = ({post}) => {
  return(
    <li role="post" key={ post._id }>{ post.message }</li>
  )
}

export default Post;