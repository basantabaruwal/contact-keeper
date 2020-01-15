import React from "react";
import Header from "./Components/layout/Header";
import Contacts from "./Components/contacts/Contacts";
import AddContact from "./Components/contacts/AddContact";
import Provider from "./context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    console.log("Component App Mounted.");
  }
  render() {
    console.log("Rendering component App");
    return (
      <Provider>
        <div className="App">
          <Header branding="Contact Manager" />
          <div className="container">
            <AddContact />
            <div className="contacts">
              <Contacts />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
