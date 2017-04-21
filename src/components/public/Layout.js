import React, { Component } from 'react'
import Menu from './Menu'
import Footer from './Footer'

export default class Layout extends Component {

 

  render() {

    return (
      <div> 
        <header> 
          <Menu/>
        </header>
        <main>
           {this.props.children}
        </main>
        <Footer/>
      </div>
    )
  }

}