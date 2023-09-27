import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileURL, setProfileURL] = useState("https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg");
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
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  }
  return (
    <>
      <Navbar currentPage="signup" />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="d-inline-flex flex-column justify-content-center align-items-center">
          <h3 className="d-flex justify-content-center ml-5 text-primary display-3 p-3">Sign Up</h3>
          <input placeholder="Email" id="email" className="form-control " type='text' value={ email } onChange={(event) => handleInputChange(event, setEmail)} />
          <input placeholder="Password" id="password" className="form-control" type='password' value={ password } onChange={(event) => handleInputChange(event, setPassword)} />
          <input placeholder="First Name" className="form-control" id="first_name" type='text' value={ firstName } onChange={(event) => handleInputChange(event, setFirstName)} />
          <input placeholder="Last Name" className="form-control" id="last_name" type='text' value={ lastName } onChange={(event) => handleInputChange(event, setLastName)} />
          <input placeholder="Profile picture URL" className="form-control" id="profile_pic" type='text' value={ profileURL } onChange={(event) => handleInputChange(event, setProfileURL)} />
          <div className="d-flex justify-content-end p-3"> 
            <input id='submit' type="submit" className="btn btn-primary" value="Submit" />
          </div>
          <div className='text-muted d-flex justify-content-center'>
            <p onClick={() => navigate('/login')}>Already have an account? <i className="text-primary">Log in here</i></p>
          </div>
        </form>
      </div>
    </>
  );
}
export default SignUpForm;