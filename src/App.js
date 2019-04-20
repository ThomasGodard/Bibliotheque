import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAuthenticated: isAuth
    };
  }

  handleLogin = (data) => {
    console.log("onLogin: ", data);
    this.setState({user: data});
    isAuth = true;
  };

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/login"
          render={ props => (
           <Login
             {...props}
              onLogin={this.handleLogin}
           />
          )}
        />
        <Route
          path="/signup"
          component={Signup}
        />

        {this.state.isAuthenticated && <h1>MENU</h1>}
        <PrivateRoute exact path="/"
                      component={ props => (
                        <Test
                          {...props}
                          user={this.state.user}
                        />
                      )}
        />
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

function Test({user}) {
  return (<h2>Test ! {user.email + " " + user.userName}</h2>);
}

export default App;
