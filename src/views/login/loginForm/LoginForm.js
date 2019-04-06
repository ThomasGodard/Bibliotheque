import React from 'react';
import './LoginForm.css'
import logo from "../../../assets/bookshelf.svg";
import {Redirect} from "react-router-dom";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rememberMe: false,
            redirectToReferrer: false,
            isLoading: false
        }
    }

    render() {

        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;
        const handleSubmitForm = this.props.onClick;
        const handleEmailChange = this.props.onEmailChange;
        const handlePasswordChange = this.props.onPasswordChange;

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
                       onChange={handleEmailChange}
                       required
                       autoFocus/>
                <label htmlFor="inputPassword"
                       className="sr-only">Password</label>
                <input type="password"
                       id="inputPassword"
                       className="form-control"
                       placeholder="Password"
                       required=""
                       onChange={handlePasswordChange}/>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox"
                               value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        onClick={handleSubmitForm}>Sign in</button>
                <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
            </form>
        )
    }
}

export default LoginForm;
