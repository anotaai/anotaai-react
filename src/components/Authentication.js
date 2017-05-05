import React , { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'
import {URL} from '../helpers/constants'
import SideMenu from './private/SideMenu'

export default class Authentication extends Component {

  componentDidMount() {
    if (this.props.loginState == null) {
      browserHistory.push(URL.LOGIN);
    }
  }

  render() {
    if (this.props.loginState != null) {
      return (
         <div className="container">  
           <SideMenu  loginState={this.props.loginState} />
           {this.props.children}
         </div> );
    } else {
      return null
    }
  }
}