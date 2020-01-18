import React, { Component } from "react";
import axios from "axios";
import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from "./app-constants";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    default:
      return state;
  }
};

export default class Provider extends Component {
  state = {
    contacts: [
      // {
      //   id: 1,
      //   name: "Jhon Doe",
      //   email: "johndoe@example.com",
      //   phone: "924523345"
      // },
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    const BASE_URL = "https://jsonplaceholder.typicode.com";
    const response = await axios.get(`${BASE_URL}/users?limit=10`);

    this.setState({ contacts: response.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
