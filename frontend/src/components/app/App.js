import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path='/posts' element={<Feed />}/>
          <Route path='/login' element={<LoginForm  />}/>
          <Route path='/signup' element={<SignUpForm />}/>
        </Routes>
      </Router>
    );
}

export default App;
