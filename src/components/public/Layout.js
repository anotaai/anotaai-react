import React, { Component } from 'react'
import Menu from './Menu'
import Footer from './Footer'
import $ from 'jquery'

export default class Layout extends Component {

   componentDidMount() {
        $('select').material_select();
    }
 

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