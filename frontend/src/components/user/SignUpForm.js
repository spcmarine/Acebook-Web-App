import React, { useState } from 'react';
import Navbar from '../Navbar';
const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
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


    return (
      <>
      <Navbar currentPage="signup" />{
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
          <input placeholder="Email" id="email" className="form-control" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" className="form-control" type='password' value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" className="btn btn-primary" value="Submit" />
      </form>
      }
      </>
    );
}

export default SignUpForm;
