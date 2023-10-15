import React from "react";
import { Link } from "react-router-dom";



function navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand mx-3" href="/">
          BLOG
        </a>
        <button
          className="navbar-toggler mx-4"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
                <Link className="nav-link" to="/writeBlog">
                  Write
                </Link>
              </li>
            <li className="nav-item mx-2">
                <Link className="nav-link" to="/yourBlog">
                  urBlogs
                </Link>
              </li>
              
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/personal">
                  Personal
                </Link>
              </li>
          </ul>
          
        </div>
      </nav>
    </div>
  );
}

export default navbar;
