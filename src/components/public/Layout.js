import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from './Header'
import Footer from './Footer'

export default class Layout extends Component {


  render() {

    return (
      <div>  
        <Header />  
        <main>
           {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

}