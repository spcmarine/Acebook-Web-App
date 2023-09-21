import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [likedPost, setLikedPost] = useState({});
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetchPosts();
    }
  }, []) // We can customize this empty array part to make it so that useEffect listens for changes to the webpage

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

  const handleLikeSubmit = async (postObject) => {
    setLikedPost({postObject})

    if(token) {
      fetch('/posts', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likedPost: likedPost })
      }).then(response => {
        if(response.status === 201) {
          fetchPosts()
          console.log('Like property has been incremented')
        } else {
          console.log('Something went wrong when trying to increment likes')
        }
      })
    }

  }
  
    if(token) {
      return(
        <>
          <h2>Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
            <form onSubmit={handleSubmit}>
              <input placeholder="Write your message here" id="newPost" type="text" value= { message } onChange={handleCreatePost}/> 
              <input id="submit" type="submit" value="Create Post" />

            </form>
          <div id='feed' role="feed">   
          {/* role seems to be an accessibilty descriptor for screen readers*/}
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } handleLikeSubmit={handleLikeSubmit} /> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;
