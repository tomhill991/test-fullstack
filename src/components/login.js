import React from "react"
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this)
      this.state = {
        username: '',
        password: '',
        errors: [],
        pwdStrength: null
      }
  }

  showValidationErr (e, msg) {
    this.setState((prevState) => ( { errors: [...prevState.errors, { e, msg }] } ));
  }

  clearValidationErr (e) {
    this.setState((prevState) => {
      let newArr = [];
      for(let err of prevState.errors) {
        if(e !== err.e) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    })
  }

   onUsernameChange= (e) => {
    this.setState({ username: e.target.value })
    this.clearValidationErr("username");
   }

   onPasswordChange= (e) => {
    this.setState({ password: e.target.value })
    this.clearValidationErr("password");
    // set state of password strength based on length. Render these as CSS below
    if (e.target.value.length <= 8) {
      this.setState({ pwdStrength: "pwd-weak"})
    } if (e.target.value.length > 8) {
      this.setState({ pwdStrength: "pwd-medium" })
    } if (e.target.value.length > 12) {
      this.setState({ pwdStrength: "pwd-strong" })
    }
  }

 // on submit, time is logged (new Date) and state of title and description is changed
   loginSubmit= (e) => {
    e.preventDefault()

      if(this.state.username === "") {
        this.showValidationErr("username", "Username cannot be empty")
      } if (this.state.password === "") {
        this.showValidationErr("password", "Password cannot be empty")
      }


    const username = this.state.username
    this.props.login(username)
    // call onSubmit in LightningTalk so that new talk is added from form

    // this.props.postInApp(usernamePassword)
   }
   render() {

    let usernameErr = null;
    let passwordErr = null;

    for(let err of this.state.errors) {
      if(err.e === "username") {
        usernameErr = err.msg
      } if (err.e === "password") {
        passwordErr = err.msg
      }
    }

    return (
      <form className="form-container">
        <label>
        <p className="form-title">Username:</p>
          <input className="input-username"
          placeholder="enter your username"
          value={this.state.username}
          onChange={this.onUsernameChange}
          />
          <small className = "danger-error"> { usernameErr ? usernameErr : "" }</small>
        </label>
        <br />
        <label>
        <p className="form-description">Password:</p>
          <input className="input-password"
          placeholder="enter your password"
          value={this.state.password}
          onChange={this.onPasswordChange}
          type="password"
          />
          <small className="danger-error"> { passwordErr ? passwordErr : "" }</small>
          {this.state.password && <div className="password-state">
            <div
              className={"pwd " + (this.state.pwdStrength)}></div>
          </div>}
        {/*when the button is clicked, call the loginSubmit function above. E (event) is passed into loginSubmit function (above)*/}
        </label>
        <br />
        <button onClick={e => this.loginSubmit(e)}>Login</button>
      </form>
      );
    }
}

export default Login;
