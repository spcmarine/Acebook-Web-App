import React from 'react';
import { Link } from 'react-router-dom';
import "../components/app/App.css";


const logout = () => {
  window.localStorage.removeItem("token");
}


const Navbar = ({ currentPage }) => {
  return (
    <nav className="navbar navbar-expand-lg flex sticky-top mb-5" style={{ background: '#3a405a' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ color: '#fffbff' }} to="/">Acebook</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active fw-bold" style={{ color: '#fffbff' }} to="/posts">Home</Link>
          </li>
          <li className="nav-item">
            {currentPage === 'signup' || currentPage === 'login' ? (
              <Link className="nav-link" style={{ color: '#fffbff' }} to="/login">Login</Link>
              ) : (
                <Link className="nav-link" style={{ color: '#fffbff' }} to="/posts">Post</Link> 
            )} 
            

            
          </li>
          <li className="nav-item">
            {currentPage === 'signup' || currentPage === 'login'? (
              <Link className="nav-link" style={{ color: '#fffbff' }} to="/signup">Sign Up</Link>
            ) : (
              <Link className="nav-link" style={{ color: '#fffbff' }} onClick={logout} to="/login">Log Out</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
