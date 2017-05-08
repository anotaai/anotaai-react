import React , { Component } from 'react';
import {browserHistory} from 'react-router'
import {URL} from '../helpers/constants'
import SideMenu from './private/SideMenu'
import { connect } from 'react-redux'

class Authentication extends Component {

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

const mapStateToProps = state => {
  return {loginState: state.auth.loginState}
}

const AuthenticationContainer = connect(mapStateToProps)(Authentication)

export default AuthenticationContainer;

