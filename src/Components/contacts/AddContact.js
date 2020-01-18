import React, { Component } from "react";
import { Consumer } from "../../context";
import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
import { ADD_CONTACT } from "../../app-constants";

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

    // const newContact = {
    //   id: uuid(),
    //   name,
    //   email,
    //   phone
    // };

    // dispatch({
    //   type: "ADD_CONTACT",
    //   payload: newContact
    // });

    const newContact = {
      name,
      email,
      phone
    };

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({
      type: ADD_CONTACT,
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

  saveAndAddAnother = () => {
    console.log("Save and add another.");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div
              className="card mb-3 col-6 center"
              style={{
                margin: "0 auto",
                padding: "4rem",
                boxShadow: "0 .5rem 1.0rem 3px rgba(0, 0, 0, 0.10)"
              }}
            >
              <h2 className="card-header py-5">Add Contact</h2>
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
                  <div className="form-group py-5">
                    <div className="btn-group btn-block">
                      <button
                        className="btn btn-primary btn-lg"
                        data-redirect="false"
                      >
                        Save and Add Another
                      </button>
                      <button
                        className="btn btn-info btn-lg"
                        data-redirect="true"
                      >
                        Save
                      </button>
                    </div>
                  </div>
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
