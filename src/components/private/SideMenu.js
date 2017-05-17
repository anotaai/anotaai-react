import React, { Component } from 'react'
import MenuService from '../../services/menu/MenuService'
import { Link } from 'react-router'
import { ProfileContainer } from './profile/Profile'
import $ from 'jquery'

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
            <li><Link to={itemMenu.url}><i className="material-icons">{itemMenu.iconeMaterial.className}</i>{itemMenu.descricao}</Link></li>
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
          <ProfileContainer idDropdown="dropdownResponsive" />
          <Links listMenu={this.state.listMenu} />
        </ul>
      </div>
    )
  }
}

