import { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'
import {urlLogin} from '../helpers/constants'

class Authentication extends Component {
 
  componentDidMount() {
    if (!this.props.authenticated) {
      browserHistory.push(urlLogin);
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