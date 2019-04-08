import React from "react";
import "./Login.css";
import LoginForm from "./loginForm/LoginForm";

class Login extends React.Component {
  render() {
    const { location } = this.props;
    const handleSubmitForm = this.props.onClick;
    const handleEmailChange = this.props.onEmailChange;
    const handlePasswordChange = this.props.onPasswordChange;

    console.log("location", location);

    return (
      <div className="login-body text-center">
        {location.pathname === '/login' && (
          <LoginForm
            location={location}
            onClick={handleSubmitForm}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
          />
        )}
      </div>
    );
  }
}

export default Login;
