import React , { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'
import {URL} from '../helpers/constants'
import SideNavMenu from './private/SideNavMenu'

class Authentication extends Component {
 
  componentDidMount() {
    if (!this.props.authenticated) {
      browserHistory.push(URL.LOGIN);
    }
  }

  render() {
    if (this.props.authenticated) {
      return (
         <div>  
          <SideNavMenu />
          {this.props.children}
         </div> );
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated }
};

const AuthenticationContainer = connect(mapStateToProps)(Authentication);

export default AuthenticationContainer