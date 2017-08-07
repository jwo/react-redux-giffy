import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
  }
  handleUsernameChange(event){
    this.setState({username: event.target.value})
  }
  handlePasswordChange(event){
    this.setState({password: event.target.value})
  }
  handleSignIn(event){
    event.preventDefault()
    this.props.dispatch({type: 'START_LOADING'})

    fetch("http://0.0.0.0:5000/api/auth", {
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
    })
    .then( () => {
      this.props.dispatch({type: 'STOP_LOADING'})
    })

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Giffy</h2>
        </div>
        <div className="App-intro">

          {this.props.loading === true &&
            <p>...loading...</p>
          }

          {this.props.user.username &&
            <h1>Hiya {this.props.user.username}</h1>
          }

          {!this.props.user.username &&

            <form onSubmit={this.handleSignIn}>
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
          }

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
