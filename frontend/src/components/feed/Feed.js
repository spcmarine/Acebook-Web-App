import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState("");   //change to name

  useEffect(() => {
    if(token) {
      fetchPosts();
    }
  }, [])

  useEffect(() => {
    const userEmail = window.localStorage.getItem("userEmail");   //change to name
    setUserEmail(userEmail);
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(token) {
      fetch("/posts", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
      }).then(response => {
        if(response.status === 201) {
          fetchPosts();
          console.log('Post has been successfully added')
        } else {
          console.log('Something went wrong, post was not added')
        }
      })
    }
  }
  
  const fetchPosts = () => {
    fetch("/posts", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setPosts(data.posts);
      })
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const handleCreatePost = (event) => {
    setMessage(event.target.value)
  }
  
  if(token) {                                       //change to name
    return(
      <>
        <h4>Welcome, <i>{userEmail}!</i></h4> 
        <br></br>
        <h2>Posts</h2>
        <button onClick={logout}>
          Logout
        </button>
        <form onSubmit={handleSubmit}>
          <input placeholder="Write your message here" id="newPost" type="text" value= { message } onChange={handleCreatePost}/> 
          <input id="submit" type="submit" value="Create Post" />
        </form>
        <div id='feed' role="feed">   
          {posts.map(
            (post) => ( <Post post={ post } key={ post._id } /> )
          )}
        </div>
      </>
    )
  } else {
    navigate('/login')
  }
}

export default Feed;
