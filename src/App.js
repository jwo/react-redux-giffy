import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import SignInForm from './SignInForm'
import GifList from './GifList'
import GifForm from './GifForm'

class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Giffy</h2>
        </div>
        <div className="App-intro">

          {this.props.user.username &&
            <div>
              <h1>Hiya {this.props.user.username}</h1>
              <GifForm />
              <GifList />
            </div>

          }

          {!this.props.user.username &&
            <SignInForm />
          }

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
