import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      redirect: false
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
  }
  handleUsernameChange(event){
    this.setState({username: event.target.value})
  }
  handlePasswordChange(event){
    this.setState({password: event.target.value})
  }
  handleRegistration(event){
    event.preventDefault()
    this.props.dispatch({type: 'START_LOADING'})

    fetch("http://0.0.0.0:5000/api/registration", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "content-type": "application/json"
      }
    })
    .then( r => r.json())
    .then( json => {
      const username = json.username
      const token = json.token
      this.props.dispatch({type: "AUTH", username, token})
      // HOW TO GET OVER TO /register
      this.setState({redirect: true})
    })
    .then( () => {
      this.props.dispatch({type: 'STOP_LOADING'})
    })

  }
  render() {
    if (this.state.redirect === true){
      return <Redirect to="/"/>
    }
    return (
      <div className="SignInForm">
        {this.props.loading === true &&
          <p>...loading...</p>
        }

        <form onSubmit={this.handleRegistration}>
          <div>
            <input type="text" onChange={this.handleUsernameChange} placeholder="Your Username"/>
          </div>
          <div>
            <input type="password" onChange={this.handlePasswordChange}  placeholder="Your Password"/>
          </div>
          <div>
            <input type="submit" value="Sign In"/>
          </div>
        </form>

        or <Link to="/">Sign In</Link>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect (mapStateToProps)(Register)
