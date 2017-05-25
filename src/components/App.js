import React, { Component } from 'react'
import NavBarContainer from './NavBar'
import FooterContainer from './Footer'
import LoadingBar from 'react-redux-loading-bar'
import { browserHistory } from 'react-router'

export function push(url,e) {
   if(e)
    e.preventDefault();
   browserHistory.push(url);   
}


export default class App extends Component {

  render() {
    return (
      <div>
        <header>
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