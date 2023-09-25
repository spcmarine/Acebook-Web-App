import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import Navbar from '../Navbar';
const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(""); 

  useEffect(() => {
    if(token) {
      fetchPosts();
    }
  }, []) // We can customize this empty array part to make it so that useEffect listens for changes to the webpage

  useEffect(() => {
    const userEmail = window.localStorage.getItem("userEmail");   //change to name
    setUserEmail(userEmail); //change me
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
      }).then(data => {
        setMessage("")
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
        setPosts(data.posts.reverse());

      })
  }


  const handleCreatePost = (event) => {
    setMessage(event.target.value)
  }

  const handleLikeSubmit = async (postObject) => {

    if(token) {
      fetch('/posts', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likedPost: postObject })
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
  
    if(token) {                                 //change to name
      return(
        <>
      <Navbar currentPage="feed" />{
        <>
        

        <h6>User : <i className="text-info fw-bold">{ userEmail}</i></h6> 
        <br></br>
        
          <h2 className=" d-flex justify-content-start ml-5 text-primary">Posts</h2>
            {/* <button onClick={logout}>
              Logout
            </button> */}
            <div  role="document">
            <form onSubmit={handleSubmit} className="d-inline-flex" >
              <input placeholder="Write your message here" className="form-control" id="newPost"  type="text" value= { message } onChange={handleCreatePost}/> 
              <input id="submit" type="submit" className="btn btn-primary" value="Create Post" />

            </form>
            </div>
  
          
          <div id='feed' role="feed"  >   
          
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } handleLikeSubmit={handleLikeSubmit} /> )
              )}
          
          </div>
        
        </>
    }
    </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;


// update mongodb schema with comment document
// fetch request in feed.js to comment doc
// pass this down to comment.js
// map through comments to display on frontend