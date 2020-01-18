import React from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";
import { DELETE_CONTACT } from "../../app-constants";

class Contact extends React.Component {
  state = {
    expanded: this.props.expanded
  };
  toggleExpansion = e => {
    // console.log(e.target);
    this.setState({
      expanded: !this.state.expanded
    });
  };

  onEditClick = async (id, dispatch) => {
    console.log("onEditClick");
  }

  onDeleteClick = async (id, dispatch) => {
    // // console.log("onDeleteClick");
    // const action_delete = {
    //     type: 'DELETE_CONTACT',
    //     payload: id
    // }
    // dispatch(action_delete)

    const action_delete = {
      type: DELETE_CONTACT,
      payload: id
    };

    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch(action_delete);
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    return (
      <Consumer>
        {value => {
          const { dispatch, contact } = value;
          return (
            <div className="contact-box card card-body mb-3">
              <h4
                className="contact-box__header"
                onClick={this.toggleExpansion}
              >
                <i className="fas fa-user">&nbsp;&nbsp;</i>
                {name}
                &nbsp;
                <i className="contact-box__toggle fas fa-sort-down">
                  &nbsp;&nbsp;
                </i>
              </h4>
              
              {/* <Link to={`contact/edit/${id}`} */}
              <Link to={`contact/edit/${id}`}
                className="contact-box__edit fas fa-pen text-warning"
                onClick={this.onEditClick.bind(this, id, contact)}
                style={{ cursor: "pointer" }}
              >
                &nbsp;
              </Link>
              <i
                className="contact-box__delete fas fa-times text-danger"
                onClick={this.onDeleteClick.bind(this, id, dispatch)}
                style={{ cursor: "pointer" }}
              >
                &nbsp;
              </i>
              {this.state.expanded ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email} </li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired
};

Contact.defaultProps = {
  expanded: false
};

export default Contact;
