import React from "react";
import "./Login.css";
import logo from "../../assets/bookshelf.svg";
import {Spinner} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import userService from "../../services/userService";

class Login extends React.Component {
  onLogin = this.props.onLogin;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isEmailValid: false,
      isPasswordValid: false,
      rememberMe: false,
      redirectTo: false,
      isLoading: false
    };
  }

  handleSubmitForm = event => {
    const { email, password } = this.state;

    this.setState({isLoading: true});

    userService
      .getUser(email, password)
      .then(data => {
        this.setState({isLoading: false});
        if (data.error) {
          console.log("error: ", data.error);
        } else {
          this.onLogin(data);
          this.setState({redirectTo: true});
        }
      });

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
    let { from } = { from: { pathname: "/" } };

    if (this.state.redirectTo) return <Redirect to={from} />;

    return (
      <div className="login-body text-center">
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
                  onClick={this.handleSubmitForm}>{!this.state.isLoading ? "Sign in" :
            <Spinner
              size="sm"
              animation="grow"
              variant="light" />}</button>
          <p className="text-left mt-2">Pas de compte ? - <Link to="/signup">Créer un compte</Link></p>
          <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
        </form>
      </div>
    );
  }
}

export default Login;
