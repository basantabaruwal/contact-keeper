import React, {Component} from 'react';

const Context = React.createContext();


const reducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id!==action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
      default:
        return state;
  }
}

export default class Provider extends Component {
    state = {
      contacts: [
        {
          id: 1,
          name: "Jhon Doe",
          email: "johndoe@example.com",
          phone: "924523345"
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "janedoe@example.com",
          phone: "984533345"
        },
        {
          id: 3,
          name: "Hari Dura",
          email: "durahari@example.com",
          phone: "984583305"
        }
      ],
      dispatch: action => {
        this.setState(state => reducer(state, action))
      }
    }

    render(){
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;