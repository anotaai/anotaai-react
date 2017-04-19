import React, { Component } from 'react'
import { Link } from 'react-router'
import {urlHome,urlLogin,urlRegistrar} from '../../helpers/constants'

export default class Menu extends Component {


    render() {
        return (

            <header>
                <nav className="indigo" role="navigation">
                    <div className="nav-wrapper container"><Link id="logo-container"  to={urlHome} className="brand-logo">Anotaai</Link>
                        <ul className="right hide-on-med-and-down">
                            <li> <Link to={urlLogin}>Acessar</Link></li>
                            <li> <Link to={urlRegistrar}>Registrar</Link></li>
                        </ul>

                        <ul id="nav-mobile" className="side-nav">
                            <li><a href="#">Navbar Link</a></li>
                        </ul>
                        <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
            </header>);
    }
}