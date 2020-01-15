import React from "react";
import PropTypes from "prop-types";

const Header = props => {
  const { branding } = props;
  return (
    <nav className="navbar navbar-dark navbar-expand-sm bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          <h3>
          {branding}
          </h3>
        </a>
        <div>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item"><a href="/" className="nav-link">
                  <i className="fas fa-home">&nbsp;&nbsp;</i>
                  Home
                  </a></li>
            </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: "My App"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};
export default Header;
