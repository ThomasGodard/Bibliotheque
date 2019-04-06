import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isEmailValid: false,
      isPasswordValid: false,
      isAuthenticated: isAuth
    };
  }

  handleSubmitForm = event => {
    const { email, password } = this.state;

    if (this.state.isEmailValid && this.state.isPasswordValid) {
      fetch("http://localhost:3030/users/login", {
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
    } else {
      // TODO : message à l'utilisateur
    }

    event.preventDefault();
  };

  handleEmailChange = event => {
    const input = event.target;

    this.setState({
      email: input.value,
      isEmailValid: input.validity.valid
    });
  };

  handlePasswordChange = event => {
    const { value } = event.target;
    const validity = value.length > 3;

    this.setState({
      password: value,
      isPasswordValid: validity
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
        <Route
          path="/signup"
          component={Signup}
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
