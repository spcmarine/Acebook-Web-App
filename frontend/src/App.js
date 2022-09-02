import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {posts: []}
  }

  componentDidMount() {
    fetch("/posts", {
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwZjJiMmUwYTgzZTYyOGVmOWRmODIwIiwiaWF0IjoxNjYyMTQwMDE5NTM0LCJleHAiOjE2NjIxNDAwMjAxMzR9.A8MH85lmsfNmDdqDxaocPv53T30VUbNJ1L0o8bNbNZs"
      }
    })
      .then(response => response.json())
      .then(data => {this.setState({ posts: data.posts }); console.log(this.state.posts)});
  }

  render() {
    return (
      <div className="App">
        <h2>Posts</h2>
        {this.state.posts.map(
          (post) => ( <p> { post.message } </p> )
        )}
      </div>
    );
  }
}

export default App;
