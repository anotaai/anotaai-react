import React, { Component } from 'react'
import MenuService from '../../services/menu/MenuService'
import { Link } from 'react-router'
import blank_avatar from "../../img/blank_avatar.png"
import $ from 'jquery'


class Profile extends Component {


  componentDidMount() {
    $('#profile').dropdown({});
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
              <a id="profile" className="btn-flat dropdown-button waves-effect waves-light white-text profile-btn"  href="#" data-activates='dropdown1'>Anota ai<i className="material-icons right">arrow_drop_down</i></a>
              <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">Settings<i className="material-icons">settings</i></a></li>
                <li className="divider"></li>
                <li><a href="#!">Logout<i className="material-icons">power_settings_new</i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    );

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
  }


  render() {

    return (
      <ul className="side-nav fixed">
        <Profile />
        {this.state.listMenu.map(itensMenu =>
          (<div key={itensMenu.action}>
            <li><Link to="/home"><i className="material-icons">contacts</i>{itensMenu.descricao}</Link></li>
            <li><div className="divider"></div></li>
          </div>
          )
        )}
      </ul>
    )
  }

}