import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBarContainer from './NavBar';
import FooterContainer from './Footer';
import LoadingBar from 'react-redux-loading-bar';
import RenewLoginContainer from './RenewLogin';
import { browserHistory } from 'react-router';
import Base64Service from '../services/app/Base64Service';
import { ToastContainer } from 'react-toastify';

export function push(url, e) {
   if (e)
    e.preventDefault();
   browserHistory.push(url);   
   
}

export function pushEncoded(url, id) {
  const encodedId = Base64Service.encode(id.toString());
  browserHistory.push(`${url}/${encodedId}`);
}


export default class App extends Component {

  componentDidUpdate = () => { ReactDOM.findDOMNode(this).scrollIntoView(); }
  
  render() {
    return (
      <div>
        <header>
          <RenewLoginContainer />
          <ToastContainer />
          <NavBarContainer />
          <LoadingBar />
        </header>
        <main>
          {this.props.children}
        </main>
        <FooterContainer />
      </div>
    )
  }
}