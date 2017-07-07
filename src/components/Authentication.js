import React , { Component } from 'react';
import {browserHistory} from 'react-router'
import {URL} from '../helpers/constants'
import SideMenuContainer from './private/SideMenu'
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
        <div className="row">
          <div className={this.props.menuState.classMenu}>
            <SideMenuContainer loginState={this.props.loginState} />
          </div>
          <div className={this.props.menuState.classContent}>
            {this.props.children}
          </div>
        </div>);
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {loginState: state.auth.loginState , menuState: state.menu}
}

const AuthenticationContainer = connect(mapStateToProps)(Authentication)

export default AuthenticationContainer;

