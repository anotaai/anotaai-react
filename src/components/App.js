import React, { Component } from 'react'
import NavBarContainer from './NavBar'
import FooterContainer from './Footer'
import registerFetchInterceptor from '../services/app/fetchInterceptor'
import LoadingBar from 'react-redux-loading-bar'


export default class App extends Component {

  constructor() {
    super();
    registerFetchInterceptor();
    let nodeEnv = `${process.env.NODE_ENV}`;
    if (nodeEnv === 'production') {
      console.clear();
    }
  }

  render() {

    return (
      <div>
        <header>
           <NavBarContainer />
           <LoadingBar/>
        </header>
        <main>
          {this.props.children}
        </main>
        <FooterContainer/>
      </div>
    )
  }

}