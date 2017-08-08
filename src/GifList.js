import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchTheGifs} from './actions'

class GifList extends Component {
  componentWillMount(){
    this.props.dispatch( fetchTheGifs() )
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
