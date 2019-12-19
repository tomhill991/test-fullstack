import React from "react"

class Login extends React.component {
  constructor(props) {
    this.loginSubmit = this.loginSubmit.bind(this)
      this.state = {
        username: '',
        password: '',
        errors: []
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
   }

 // on submit, time is logged (new Date) and state of title and description is changed
   loginSubmit= (e) => {
    e.preventDefault()

      if(this.state.username == "") {
        this.showValidationErr("username", "Username cannot be empty")
      } if (this.state.password == "") {
        this.showValidationErr("password", "Password cannot be empty")
      }


    const username = this.state.username
    const password = this.state.password
    // call onSubmit in LightningTalk so that new talk is added from form

    // this.props.postInApp(usernamePassword)
   }
   render() {

    let usernameErr = null;
    let passwordErr = null;

    for(let err of this.state.errors) {
      if(err.e == "username") {
        usernameErr = err.msg
      } if (err.e == "password") {
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
          onChange={e => this.onUsernameChange.bind(this)}
          />
          <small className = "danger-error"> { usernameErr ? usernameErr : "" }</small>
        </label>
        <br />
        <label>
        <p className="form-description">Password:</p>
          <input className="input-password"
          placeholder="enter your password"
          value={this.state.password}
          onChange={e => this.onPasswordChange.bind(this)}
          />
          <small className = "danger-error"> { passwordErr ? passwordErr : "" }</small>
        {/*when the button is clicked, call the onSubmit function above. E (event) is passed into onSubmit function (above)*/}
        </label>
        <br />
        <button onClick={e => this.loginSubmit(e)}>Submit Talk</button>
      </form>
      );
    }
}
