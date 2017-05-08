import React, { Component } from 'react'
import MenuService from '../../services/menu/MenuService'
import { Link } from 'react-router'
import blank_avatar from '../../img/blank_avatar.png'
import AuthenticationService from '../../services/app/AuthenticationService'
import UserService from '../../services/UserService'
import {connect} from 'react-redux'
import $ from 'jquery'


class Profile extends Component {
  componentDidMount() {
    $('#profile').dropdown({});
  }

  logout(e) {
     e.preventDefault();  
     UserService.logout(this.props.loginState).then(response => {
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
              <a id="profile" className="btn-flat dropdown-button waves-effect waves-light white-text profile-btn"  href="#" data-activates='dropdown1'>{this.props.loginState.login.primeiroNome}<i className="material-icons right">arrow_drop_down</i></a>
              <ul id="dropdown1" className="dropdown-content">
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
  }


  render() {

    return (
      <ul className="side-nav fixed">
        <Profile loginState={this.props.loginState} />
        {this.state.listMenu.map(itemMenu =>
          (<div key={itemMenu.action}>
            <li><Link to="/home"><i className="material-icons">{itemMenu.icone.descricao}</i>{itemMenu.descricao}</Link></li>
            <li><div className="divider"></div></li>
          </div>
          )
        )}
      </ul>
    )
  }

}

