import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("profilePic", profilePic);


    fetch( '/users', {
      method: 'post',
      body: formData})
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

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
  }


    return (
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input placeholder="Name" id="name" type='text' value={ name } onChange={handleNameChange} />
          <input type='file' accept="image/*" id="ProfilePic" onChange={handleProfilePicChange} />

        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
