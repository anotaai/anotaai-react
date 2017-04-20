import React, { Component } from 'react'
import Menu from './Menu'
import Footer from './Footer'

export default class Layout extends Component {

 

  render() {

    return (
      <div>  
        <Menu/>
        <div className="progress">
          <div className="indeterminate"></div>
        </div>  
        <main>
           {this.props.children}
        </main>
        <Footer/>
      </div>
    )
  }

}