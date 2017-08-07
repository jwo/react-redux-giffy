import React, { Component } from 'react';
import {connect} from 'react-redux'

class GifForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
  }
  handleSubmit(event){
    event.preventDefault()
    this.props.dispatch({type: 'START_LOADING'})
    const token = this.props.user.token;
    fetch("http://0.0.0.0:5000/api/gifs", {
      method: "POST",
      body: JSON.stringify({
        url: this.state.url
      }),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then( r => r.json())
    .then( json => {
      const gif = json.gif;
      this.props.dispatch({type: 'NEW_GIF', gif: gif})
    })
    .then( () => {
      this.props.dispatch({type: 'STOP_LOADING'})
    })
    .then( () => this.setState({url: ""}))
  }
  handleUrlChange(event){
    this.setState({
      url: event.target.value
    })
  }
  render(){
    return <form onSubmit={this.handleSubmit}>
      {this.props.loading === true &&
        <span>...loading...</span>
      }
      <input type="text" onChange={this.handleUrlChange} placeholder="URL of Gif"/>
    </form>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading
  }
}
export default connect(mapStateToProps)(GifForm)
