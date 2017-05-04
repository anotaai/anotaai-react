import React, { Component } from 'react'
import $ from 'jquery'

export default class SideMenu extends Component {

  componentDidMount() {
     
  }


  render() {
    return (
      <ul className="side-nav fixed">
        <li><a href="#!"><i className="material-icons">cloud</i>Cifras</a></li>
        <li><a href="#!">Second Cifras</a></li>
        <li><div className="divider"></div></li>
        <li><a className="subheader">Subheader Cifras</a></li>
        <li><a className="waves-effect" href="#!">Third Link With Waves Cifras</a></li>
      </ul>
    )
  }

}