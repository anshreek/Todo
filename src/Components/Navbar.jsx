import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container">
       
        <a className="navbar-brand" href="/">
          📚TodoList-App
        </a>
      
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
       
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/notes">
                ✍️Notes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/records">
                📋Records
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Calendar">
                🗓️ Records Calendar
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
