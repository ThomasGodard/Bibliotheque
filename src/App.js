import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Login from "./Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isAuthenticated: isAuth
    };
  }

  handleSubmitForm = event => {
    const { email, password } = this.state;

    fetch("http://localhost:3030/login", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: "POST",
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });

    event.preventDefault();
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              onClick={this.handleSubmitForm}
              onEmailChange={this.handleEmailChange}
              onPasswordChange={this.handlePasswordChange}
            />
          )}
        />

        {this.state.isAuthenticated && <h1>MENU</h1>}
        <PrivateRoute exact path="/" component={Test} />
      </BrowserRouter>
    );
  }
}

let isAuth = false;

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function Test() {
  return <h2>Test !</h2>;
}

export default App;
