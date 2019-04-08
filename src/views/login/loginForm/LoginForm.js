import React from 'react';
import './LoginForm.css'
import logo from "../../../assets/bookshelf.svg";
import {Link, Redirect} from "react-router-dom";

class LoginForm extends React.Component {

  onLogin = this.props.onLogin;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isEmailValid: false,
      isPasswordValid: false,
      rememberMe: false,
      redirectToReferrer: false,
      isLoading: false
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
          this.props.onLogin(data);
          this.setState({redirectToReferrer: true});
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

    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return(
      <form className="form-signin">
        <img className="mb-4" src={logo} alt="" width="72" height="72"/>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail"
               className="sr-only">Email address</label>
        <input type="email" id="inputEmail"
               className="form-control"
               placeholder="Email address"
               onChange={this.handleEmailChange}
               required
               autoFocus/>
        <label htmlFor="inputPassword"
               className="sr-only">Password</label>
        <input type="password"
               id="inputPassword"
               className="form-control"
               placeholder="Password"
               required=""
               onChange={this.handlePasswordChange}/>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox"
                   value="remember-me"/> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block"
                type="submit"
                onClick={this.handleSubmitForm}>Sign in</button>
        <p className="text-left mt-2">Pas de compte ? - <Link to="/signup">Créer un compte</Link></p>
        <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
      </form>
    )
  }
}

export default LoginForm;
