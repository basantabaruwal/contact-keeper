import React from "react";
import Header from "./Components/layout/Header";
import Contacts from "./Components/contacts/Contacts";
import AddContact from "./Components/contacts/AddContact";
import EditContact from "./Components/contacts/EditContact";
import About from "./Components/Pages/About";
import Page404 from "./Components/Pages/Page404";
import Provider from "./context";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// for publishing this app to github change BrowserRouter to HashRouter
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { APP_NAME } from "./app-constants";

class App extends React.Component {
  componentDidMount() {
    console.log("Component App Mounted.");
  }
  render() {
    console.log("Rendering component App");
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding={`${APP_NAME}`} />
            <div className="container" style={{marginTop: '8rem'}}>
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route component={Page404} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
