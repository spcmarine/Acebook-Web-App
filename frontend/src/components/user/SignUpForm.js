import React, { useState } from 'react';
import Navbar from '../Navbar';
const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileURL, setProfileURL] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, profileURL: profileURL })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } 
        else if(response.status === 400) {
          alert("You need to add email, password, first and last name")
          navigate('/signup')
        } 
        else if(response.status === 409) {
          alert("User already exists")
          navigate('/signup')
        }
        else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleprofileURLChange = (event) => {
    setProfileURL(event.target.value)
  }


    return (

      <>
      <Navbar currentPage="signup" />{
        <div className="d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="d-inline-flex flex-column justify-content-center align-items-center">
        <h3 className="d-flex justify-content-center ml-5 text-primary display-3 p-3">Sign Up</h3>
          <input placeholder="Email" id="email" className="form-control " type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" className="form-control" type='password' value={ password } onChange={handlePasswordChange} />
          <input placeholder="First Name" className="form-control" id="first_name" type='text' value={ firstName } onChange={handleFirstNameChange} />
          <input placeholder="Last Name" className="form-control" id="last_name" type='text' value={ lastName } onChange={handleLastNameChange} />
          <input placeholder="Profile picture URL" className="form-control" id="profile_pic" type='text' value={ profileURL } onChange={handleprofileURLChange} />
          <div className="d-flex justify-content-end p-3"> 
            <input id='submit' type="submit" className="btn btn-primary" value="Submit" />
          </div>
      </form>
       </div>
      }
      </>
    );
}

export default SignUpForm;
