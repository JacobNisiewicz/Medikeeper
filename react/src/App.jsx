import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import logger from "./logger";
import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import Items from './components/item/Items';

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

        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
