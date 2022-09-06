import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import { Navigate, useNavigate } from 'react-router-dom'

const Feed = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
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
    } else {
      navigate('/login')
    }
  }, [])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(window.localStorage.token) {
      return(
        <div className="feed" role="feed">
          <h2>Posts</h2>
          <button onClick={logout}>
            Logout
          </button>
          <ul>
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id } /> )
            )}
          </ul>
        </div>
      )
    }
}

export default Feed;