import React from "react";
import "./Login.css";
import LoginForm from "./loginForm/LoginForm";

class Login extends React.Component {
  render() {
    const { location, onLogin: handleLogin } = this.props;

    console.log("location", location);

    return (
      <div className="login-body text-center">
        {location.pathname === '/login' && (
          <LoginForm
            location={location}
            onLogin={handleLogin}
          />
        )}
      </div>
    );
  }
}

export default Login;
