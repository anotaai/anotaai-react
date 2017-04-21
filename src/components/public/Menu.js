import React, { Component } from 'react'
import { Link } from 'react-router'
import {urlHome,urlLogin,urlRegistrar} from '../../helpers/constants'

export class LinksMenu extends Component  {
     
     render() {

       const styleLinkMenu = this.props.styleLinkMenu;

       return (
        <ul  className={this.props.className} style={{transform:styleLinkMenu}}>
            <li className="hide-on-large-only"> <Link onClick={this.props.callbackHideResponsiveMenu}><span className="right indigo-text">X</span></Link> </li>
            <li> <Link to={urlLogin} onClick={this.props.callbackHideResponsiveMenu} >Acessar</Link> </li>
            <li> <Link to={urlRegistrar} onClick={this.props.callbackHideResponsiveMenu}>Registrar</Link> </li>
        </ul>)
    }
}


export default class Menu extends Component {
  
   constructor() {
       super();
       this.state = {styleLinkMenu: ''};
   }
 
    openResponsiveMenu(){
       this.setState({styleLinkMenu: 'translateX(0px)'});
    }

    hideResponsiveMenu(){
      this.setState({styleLinkMenu: ''});
    }

    render() {
        return (
           
                <nav className="indigo" role="navigation">
                    <div className="nav-wrapper container"><Link id="logo-container" to={urlHome} className="brand-logo">Anota ai</Link>
                        <LinksMenu className="right hide-on-med-and-down" />
                        <LinksMenu className="side-nav" styleLinkMenu={this.state.styleLinkMenu} callbackHideResponsiveMenu={this.hideResponsiveMenu.bind(this)} />
                        <a href="#" onClick={this.openResponsiveMenu.bind(this)} data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
         );
    }
}