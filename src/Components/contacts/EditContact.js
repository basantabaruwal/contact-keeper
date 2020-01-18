import React, { Component } from "react";
import { Consumer } from "../../context";
import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
import { EDIT_CONTACT } from "../../app-constants";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: { name: "", email: "", phone: "" }
  };

  async componentDidMount(){
    const { id } = this.props.match.params;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

    const contact  = response.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
  }


  onFormControlChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onFormSubmit = async (dispatch, e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, email, phone } = this.state;

    // check for errors
    if (name === "") {
      this.setState({
        errors: {
          name: "Name is required"
        }
      });
      return;
    }
    if (email === "") {
      this.setState({
        errors: {
          email: "Email is required"
        }
      });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: {
          phone: "Phone is required"
        }
      });
      return;
    }

    const proposedContact = {
      name,
      email,
      phone
    }

    //  attempt to edit the selected contact
    const {id} = this.props.match.params;
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, proposedContact);

    // send the contact with received new contact
    dispatch({
      type: EDIT_CONTACT,
      payload: response.data
    });

  
    // clear the state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: { name: "", email: "", phone: "" }
    });

    // redirect back to contacts-list
    this.props.history.push("/");
  };


  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch, contact } = value;
          return (
            <div className="card mb-3"
              style={{
                margin: "0 auto",
                padding: "4rem",
                boxShadow: "0 .5rem 1.0rem 3px rgba(0, 0, 0, 0.10)"
              }}
            >
              <div className="card-header mb-3">Edit Contact</div>
              <div className="card-body">
                <form
                  className="form"
                  onSubmit={this.onFormSubmit.bind(this, dispatch)}
                >
                  <TextInputGroup
                    //   type="text"
                    label="Name"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter Name..."
                    onChange={this.onFormControlChanged}
                    error={errors.name}
                  />
                  <TextInputGroup
                    type="email"
                    label="Email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter Email..."
                    onChange={this.onFormControlChanged}
                    error={errors.email}
                  />
                  <TextInputGroup
                    //   type="text"
                    label="Phone"
                    id="phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter Phone..."
                    onChange={this.onFormControlChanged}
                    error={errors.phone}
                  />
                  <button className="btn btn-info btn-lg" data-redirect="true">
                    Update Contact
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
