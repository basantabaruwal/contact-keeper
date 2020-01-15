import React, { Component } from "react";
import { Consumer } from "../../context";
import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: { name: "", email: "", phone: "" }
  };

  onFormControlChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onFormSubmit = (dispatch, e) => {
    e.preventDefault();
    console.log(this.state);
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

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };
    dispatch({
      type: "ADD_CONTACT",
      payload: newContact
    });

    // clear the state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: { name: "", email: "", phone: "" }
    });
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
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
                  <button className="btn btn-primary btn-block btn-lg">
                    Submit
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

export default AddContact;
