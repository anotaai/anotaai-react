import React, { Component } from 'react'
import { Link } from 'react-router'
import { URL } from '../helpers/constants'
import { connect } from 'react-redux'
import caderneta from "../img/128x128.png"
import T from 'i18n-react'
import { toggleMenu, toggleResponsiveMenu } from '../actions/menuActionCreator'
import logo from "../img/logo.png"

class Links extends Component {

    hideResponsiveMenu() {
       if(this.props.menuState.showResponsiveMenu){
           this.props.toggleResponsiveMenu();
       }
    }

    render() {
        return (
            <div>
                {this.props.menuState.showResponsiveMenu &&
                   <li style={{height:'48px'}}><a onClick={this.hideResponsiveMenu.bind(this)} className="clickable"><span className="right red-text">Fechar</span></a> </li>
                }
                <li className="hide-on-large-only"> <div className="divider"></div> </li>
                <li> <Link to={URL.LOGIN} onClick={this.hideResponsiveMenu.bind(this)} >Acessar</Link></li>
                <li className="hide-on-large-only"> <div className="divider"></div> </li>
                <li> <Link to={URL.REGISTER} onClick={this.hideResponsiveMenu.bind(this)} >Registrar</Link></li>
            </div>
        )
    }
}

const mapLinksStateToProps = state => {
    return { menuState : state.menu }
}

const mapLinksDispatchToProps = dispatch => {

    return {
         
         toggleResponsiveMenu: () => {
             dispatch(toggleResponsiveMenu());
         }
    }
}

const LinksContainer = connect(mapLinksStateToProps,mapLinksDispatchToProps)(Links); 


class ResponsiveMenu extends Component {

   

    render() {

        return (
            <div>
                <ul className={"side-nav " + this.props.menuState.classResponsiveMenu}>
                    <li>
                        <div className="userView">
                            <div className="background indigo" />
                            <img className="circle white" alt="Anota ai" title="Anota ai" src={caderneta} />
                            <span className="white-text name"><T.span text={{ key: "app" }} /></span>
                        </div>
                    </li>
                    <LinksContainer />
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
                            <img alt="Anota ai" className="responsive-img" style={{maxHeight:'45px', marginTop:'5px'}} title="Anota ai" src={logo} />
                        </Link>
                        {this.props.loginState == null &&
                            <div id="publico">
                                <ul className="right hide-on-med-and-down">
                                    <LinksContainer />
                                </ul>
                            </div>}
                        
                         {/* Menu burger normal */}
                        {this.props.loginState != null &&
                          <a className="hide-on-med-and-down menu-burger" onClick={this.props.toggleMenu} ><i className="material-icons">menu</i></a>
                        }
                        {/* Menu burger responsivo */}
                        <a className="hide-on-large-only menu-responsive-burger" onClick={this.props.toggleResponsiveMenu} ><i className="material-icons">menu</i></a>
                    </div>
                </nav>
                {this.props.loginState == null && <ResponsiveMenu menuState={this.props.menuState}  />}
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {

    return {
        toggleMenu: () => {
             dispatch(toggleMenu());
        },
        toggleResponsiveMenu: () => {
            dispatch(toggleResponsiveMenu());
        }
    }
}

const mapStateToProps = state => {
    return { loginState: state.auth.loginState, baseUrl: state.auth.baseUrl , menuState: state.menu }
}


const NavbarContainer = connect(mapStateToProps,mapDispatchToProps)(Navbar);

export default NavbarContainer;