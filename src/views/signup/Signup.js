import React from "react";
import logo from "../../assets/bookshelf.svg";

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="login-body text-center">
        <form className="form-signin">
          <img className="mb-4" src={logo} alt="" width="72" height="72"/>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <input type="text" id="inputUserName"
                 className="form-control"
                 placeholder="User Name"
                 // onChange={this.handleEmailChange}
                 required
                 autoFocus/>
          <label htmlFor="inputEmail"
                 className="sr-only">Email address</label>
          <input type="email" id="inputEmail"
                 className="form-control"
                 placeholder="Email address"
                 // onChange={this.handleEmailChange}
                 required/>
          <label htmlFor="inputPassword"
                 className="sr-only">Password</label>
          <input type="password"
                 id="inputConfirmPassword"
                 className="form-control"
                 placeholder="Confirm Password"
                 required
                 // onChange={this.handleConfirmPasswordChange}
          />
          <label htmlFor="inputConfirmPassword"
                 className="sr-only">Password</label>
          <input type="password"
                 id="inputConfirmPassword"
                 className="form-control"
                 placeholder="Password"
                 required=""
            // onChange={this.handlePasswordChange}
          />
          <button className="btn btn-lg btn-primary btn-block"
                  type="submit"
                  >Créer le compte</button>
          <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
        </form>
      </div>
    )
  }
}

export default Signup;