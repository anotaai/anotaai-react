import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import {MDCTemporaryDrawer} from '@material/drawer/dist/mdc.drawer.js';

export default class Layout extends Component {


  abreMenu(e) {
     e.preventDefault();
     var drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
     drawer.open = true;
  }

  render() {

    return (
      <div className="mdc-typography demo-body">  
        <Header />
        <main className="demo-main mdc-toolbar-fixed-adjust">
           {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

}