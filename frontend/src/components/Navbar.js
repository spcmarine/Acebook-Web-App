import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentPage }) => {
  return (
    <nav className="navbar navbar-expand-lg flex sticky-top mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Acebook</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active text-primary" to="/signup">Home</Link>
          </li>
          <li className="nav-item">
            {currentPage === 'signup' ? (
                <Link className="nav-link" to="/login">Login</Link>
            ) : (
               <Link className="nav-link" to="/feed">Post</Link> 
            )}
            
          </li>
          <li className="nav-item">
            {currentPage === 'signup' ? (
              <Link className="nav-link " to="/signup">Sign Up</Link>
            ) : (
              <Link className="nav-link " to="/login">Log Out</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
