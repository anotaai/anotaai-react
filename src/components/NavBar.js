import React, { Component } from 'react'
import { Link } from 'react-router'
import { URL } from '../helpers/constants'
import { connect } from 'react-redux'
import caderneta from "../img/128x128.png"
import $ from 'jquery'
import T from 'i18n-react'
import { toggleMenu } from '../actions/menuActionCreator'
import logo from "../img/logo.png"

class Links extends Component {

    hideResponsiveMenu() {
        $('.button-collapse').sideNav('hide');
    }

    render() {
        return (
            <div>
                <li className="hide-on-large-only"> <a onClick={this.hideResponsiveMenu} className="clickable"><span className="right red-text">Fechar</span></a> </li>
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
                <nav className="indigo">
                    <div className="nav-wrapper container">
                        <Link id="logo-container" to={this.props.baseUrl} className="brand-logo clickable">
                            <img   alt="Anota ai" className="responsive-img" style={{maxHeight:'50px'}} title="Anota ai" src={logo} />
                        </Link>
                        {this.props.loginState == null &&
                            <div id="publico">
                                <ul className="right hide-on-med-and-down">
                                    <Links />
                                </ul>
                            </div>}
                        {this.props.loginState != null &&
                          <a className="hide-on-small-only menu-burger" onClick={this.props.toggleMenu} ><i className="material-icons">menu</i></a>
                        }
                        <a data-activates="slide-out" className="button-collapse menu-responsive-burger"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
                {this.props.loginState == null && <ResponsiveMenu />}
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {

    return {
        toggleMenu: () => {
             dispatch(toggleMenu());
        }
    }
}

const mapStateToProps = state => {
    return { loginState: state.auth.loginState, baseUrl: state.auth.baseUrl }
}


const NavbarContainer = connect(mapStateToProps,mapDispatchToProps)(Navbar);

export default NavbarContainer;
