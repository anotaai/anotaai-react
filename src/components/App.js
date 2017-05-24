import React, { Component } from 'react'
import NavBarContainer from './NavBar'
import FooterContainer from './Footer'
import LoadingBar from 'react-redux-loading-bar'


export default class App extends Component {
  
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