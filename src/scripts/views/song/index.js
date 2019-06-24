import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Song extends Component {
componentWillMount(){
    let {match} = this.props;
    
    // console.log(this.props)
    console.log(this.props)
    // console.log(params)
}

  render() {
    return (
      <div>
          <p>Song</p>
          <p></p>
      </div>
    )
  }
}

