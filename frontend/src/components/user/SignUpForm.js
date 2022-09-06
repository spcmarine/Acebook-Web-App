import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {

  const navigate = useNavigate();
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
        if(response.status == 201) {
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
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input id="email" type='text' value={ email } onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input id="password" type='password' value={ password } onChange={handlePasswordChange} />
        </label>
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
