import React from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";

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

  onDeleteClick = (id, dispatch) => {
    // console.log("onDeleteClick");
    const action_delete = {
        type: 'DELETE_CONTACT',
        payload: id
    }
    dispatch(action_delete)
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    return (
      <Consumer>
        {value => {
            const { dispatch } = value;
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
              <i
                className="contact-box__delete fas fa-times text-danger"
                onClick={this.onDeleteClick.bind(this, id, dispatch)}
                style={{ cursor: "pointer" }}
              ></i>

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
