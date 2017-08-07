import React, { Component } from 'react';
import {connect} from 'react-redux'

class GifList extends Component {
  componentDidMount(){
    const token = this.props.user.token;
    fetch("http://0.0.0.0:5000/api/me/gifs",{
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then( r => r.json())
    .then( json => {
      this.props.dispatch({ type: "GIFS_RECEIVED", gifs: json.gifs})
    })
  }
  render(){
    return <div>
      <h4>{this.props.gifs.length} Gif(s)</h4>
      {this.props.gifs.map( g => {
        return <img key={g._id} src={g.url} />
      })}
    </div>
  }
}

const mapStateToProps = ( state => {
  return {
    loading: state.loading,
    gifs: state.gifs,
    user: state.user
  }
})

export default connect(mapStateToProps)(GifList)
