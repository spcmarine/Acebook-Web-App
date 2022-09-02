import React from 'react';
import Post from './Post'

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = { posts: [] }
  }

  componentDidMount() {
    fetch("/posts", {
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwZjJiMmUwYTgzZTYyOGVmOWRmODIwIiwiaWF0IjoxNjYyMTQwMDE5NTM0LCJleHAiOjE2NjIxNDAwMjAxMzR9.A8MH85lmsfNmDdqDxaocPv53T30VUbNJ1L0o8bNbNZs"
      }
    })
      .then(response => response.json())
      .then(data => {this.setState({ posts: data.posts })});
  }
  
  render() {
    return(
      <div className="App">
        <h2>Posts</h2>
        <ul>
          {this.state.posts.map(
            (post) => ( <Post message={ post.message } /> )
          )}
        </ul>
      </div>
    )
  }
}

export default Feed;