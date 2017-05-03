import { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'
import {URL} from '../helpers/constants'

class Authentication extends Component {
 
  componentDidMount() {
    if (!this.props.authenticated) {
      browserHistory.push(URL.LOGIN);
    }
  }

  render() {
    if (this.props.authenticated) {
      return this.props.children
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