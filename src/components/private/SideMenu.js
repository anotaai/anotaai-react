import React, { Component } from 'react'
import MenuService from '../../services/menu/MenuService'
import { Link } from 'react-router'
import blank_avatar from '../../img/blank_avatar.png'
import AuthenticationService from '../../services/app/AuthenticationService'
import UserService from '../../services/UserService'
import {connect} from 'react-redux'
import $ from 'jquery'


class Profile extends Component {

  logout(e) {
     e.preventDefault();  
     UserService.logout(this.props.loginState).then(response => {
         $('.button-collapse').sideNav('hide');
         AuthenticationService.clearCredentials();
         this.context.store.dispatch(UserService.dispatchLogout());
     }).catch(error => {
         alert(error);
     });
  }

  render() {
    return (
      <li>
        <div className="userView profile-details">
          <div className="row">
            <div className="col col s4 m4 l4">
              <img src={blank_avatar} alt="Avatar" className="circle responsive-img profile-image" />
            </div>
          </div>
          <div className="row">
             <div className="col col s8 m8 l8">
              <a className="btn-flat dropdown-button waves-effect waves-light white-text profile-btn"  href="#" data-activates={this.props.idDropdown}>{this.props.loginState.login.primeiroNome}<i className="material-icons right">arrow_drop_down</i></a>
              <ul id={this.props.idDropdown} className="dropdown-content">
                <li><a href="#!">Settings<i className="material-icons">settings</i></a></li>
                <li className="divider"></li>
                <li><a href="#!" onClick={this.logout.bind(this)} >Logout<i className="material-icons">power_settings_new</i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

Profile.contextTypes = {
  store: React.PropTypes.object.isRequired
}

const mapStateToProps = state => {
   return  {loginState: state.auth.loginState}
}

const ProfileContainer = connect(mapStateToProps)(Profile);

export {ProfileContainer};



export class Links extends Component {

  hideResponsiveMenu() {
    $('.button-collapse').sideNav('hide');
  }

  render() {
    return (
      <div>
        <li className="hide-on-large-only"> <a href="#" onClick={this.hideResponsiveMenu}><span className="right red-text">Fechar</span></a></li>
        <li className="hide-on-large-only"> <div className="divider"></div> </li> 
         {this.props.listMenu.map(itemMenu =>
            (<div key={itemMenu.url}>
              <li><Link to={itemMenu.url}><i className="material-icons">{itemMenu.iconeMaterial.descricao}</i>{itemMenu.descricao}</Link></li>
              <li><div className="divider"></div></li>
            </div>
          ))}
      </div>
    )
  }
} 

export default class SideMenu extends Component {

  constructor() {
    super();
    this.state = { listMenu: [] };
  }

  componentDidMount() {
    MenuService.getMenu().then(response => {
      this.setState({ listMenu: response });
    }).catch(error => {
      alert(error);
    });
    
    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown({});
  }
  render() {

    return (
      <div>
        <ul className="side-nav fixed private-side-nav">
          <ProfileContainer idDropdown="dropdownDefault" />
          <Links listMenu={this.state.listMenu} />
        </ul>
        <ul id="slide-out" className="side-nav">
          <ProfileContainer idDropdown="dropdownResponsive"/>
          <Links listMenu={this.state.listMenu} />
        </ul>
      </div>
    )
  }

}

