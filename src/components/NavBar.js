import React, { Component } from 'react'
import { Link } from 'react-router'
import { URL } from '../helpers/constants'
import { connect } from 'react-redux'
import caderneta from "../img/128x128.png"
import $ from 'jquery'
import T from 'i18n-react';

class Links extends Component {

    hideResponsiveMenu() {
        $('.button-collapse').sideNav('hide');
    }

    render() {
        return (
            <div>
                <li className="hide-on-large-only"> <a href="#" onClick={this.hideResponsiveMenu}><span className="right red-text">Fechar</span></a> </li>
                <li className="hide-on-large-only"> <div className="divider"></div> </li>
                <li> <Link to={URL.LOGIN} onClick={this.hideResponsiveMenu} >Acessar</Link> </li>
                <li className="hide-on-large-only"> <div className="divider"></div> </li>
                <li> <Link to={URL.REGISTER} onClick={this.hideResponsiveMenu} >Registrar</Link></li>
            </div>
        )
    }
}


class ResponsiveMenu extends Component {

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
                            <span className="white-text name"><T.span text={{ key: "app" }} /></span>
                        </div>
                    </li>
                    <Links />
                </ul>
            </div>
        )
    }
}

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="indigo" role="navigation">
                    <div className="nav-wrapper container">
                        <Link id="logo-container" to="/" className="brand-logo">
                            <T.span id="app-name" text={{ key: "app" }} />
                        </Link>
                        {this.props.loginState == null &&
                            <div id="publico">
                                <ul className="right hide-on-med-and-down">
                                    <Links />
                                </ul>
                            </div>}
                        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
                {this.props.loginState == null && <ResponsiveMenu />}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return { loginState: state.auth.loginState }
}


const NavbarContainer = connect(mapStateToProps)(Navbar);

export default NavbarContainer;
