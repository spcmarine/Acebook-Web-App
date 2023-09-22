import React from 'react';
import { Link } from 'react-router-dom';


const logout = () => {
  window.localStorage.removeItem("token");
}


const Navbar = ({ currentPage }) => {
  return (
    <nav className="navbar navbar-expand-lg flex sticky-top mb-5 bg-info text-white ">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">Acebook</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active text-white fw-bold" to="/posts">Home</Link>
          </li>
          <li className="nav-item">
            {currentPage === 'signup' || currentPage === 'login' ? (
              <Link className="nav-link text-white" to="/login">Login</Link>
              ) : (
                <Link className="nav-link text-white" to="/posts">Post</Link> 
            )} 
            

            
          </li>
          <li className="nav-item">
            {currentPage === 'signup' || currentPage === 'login'? (
              <Link className="nav-link text-white " to="/signup">Sign Up</Link>
            ) : (
              <Link className="nav-link text-white " onClick={logout} to="/login">Log Out</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
