import "./App.css";
import "./services/autoLogInService.js";
import "react-toastify/dist/ReactToastify.css";
import logger from "./logger";
import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import Items from './components/Items';
import ItemForm from './components/ItemForm';

const _logger = logger.extend("App");

class App extends Component {
  state = {
    currentUser: {
      roles: [],
      userName: "",
      email: ""
    }
  };

  render() {
    _logger("rendering");
    return (
      <React.Fragment>
        <ToastContainer />
        <Container>

          <Route path="/" exact={true} component={Items} />
          <Route path="/itemForm" exact={true} component={ItemForm} />

        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
