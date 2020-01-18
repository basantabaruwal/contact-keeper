import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = props => {
  const { branding } = props;
  return (
    <header
      className="app-header"
      style={{
        margin: "0 auto",
        boxShadow: "0 1rem 1.5rem 3px rgba(0, 0, 0, 0.15)"
      }}
    >
      <nav className="navbar navbar-dark navbar-expand-sm bg-danger mb-3 py-3 fixed-top">
        <div className="container">
          <a href="/" className="navbar-brand">
            <h3 className="app-heading">
              <i className="fas fa-book">&nbsp;&nbsp;</i>
              {branding}
            </h3>
          </a>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item mr-2">
                <Link to="/" className="nav-link">
                  <i className="fas fa-home">&nbsp;&nbsp;</i>
                  Home
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link to="/contact/add" className="nav-link">
                  <i className="fas fa-book">&nbsp;&nbsp;</i>
                  Add Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <i className="fas fa-info">&nbsp;&nbsp;</i>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.defaultProps = {
  branding: "React App"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};
export default Header;
