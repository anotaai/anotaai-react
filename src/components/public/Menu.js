import React, { Component } from 'react'
import { Link } from 'react-router'
import { urlHome, urlLogin, urlRegistrar } from '../../helpers/constants'
import caderneta from "../../img/128x128.png"
import $ from 'jquery'


class Links extends Component {

    hideResponsiveMenu() {
       $('.button-collapse').sideNav('hide');
    }

    render() {
        return (
            <div> 
                <li className="hide-on-large-only"> <a href="#" onClick={this.hideResponsiveMenu}><span className="right red-text">Fechar</span></a> </li>
                <li className="hide-on-large-only"> <div className="divider"></div> </li>
                <li> <Link to={urlLogin} onClick={this.hideResponsiveMenu} >Acessar</Link> </li>
                <li className="hide-on-large-only"> <div className="divider"></div> </li>
                <li> <Link to={urlRegistrar} onClick={this.hideResponsiveMenu} >Registrar</Link></li>
            </div>
        )

    }
}

 class MenuResponsivo extends Component {

    componentDidMount() {
        $(".button-collapse").sideNav();
    }

    render() {

        return (
            <div>
                <ul id="slide-out" className="side-nav">
                    <li>
                       <div className="userView">
                         <div className="background indigo" />
                         <img className="circle white" alt="Anota ai" title="Anota ai" src={caderneta} />
                         <span className="white-text name">Anota ai</span>
                       </div>
                    </li>
                    <Links />
                </ul>
            </div>
        )
    }
}


export default class Menu extends Component {

    render() {
        return (
            <div>
               <nav className="indigo" role="navigation">
                    <div className="nav-wrapper container"><Link id="logo-container" to={urlHome} className="brand-logo">Anota ai</Link>
                        <ul className="right hide-on-med-and-down">
                         <Links />
                        </ul>
                      <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
                <MenuResponsivo/>
             </div>   
            
        );
    }
}