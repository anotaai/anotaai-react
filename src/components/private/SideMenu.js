import React, { Component } from 'react'
import MenuService from '../../services/menu/MenuService'
import { Link } from 'react-router'
import { ProfileContainer } from './profile/Profile'
import UserService from '../../services/UserService'
import { connect } from 'react-redux'
import $ from 'jquery'

export class Links extends Component {

  constructor() {
    super();
    this.element = null;
  }

  hideResponsiveMenu() {
    $('.button-collapse').sideNav('hide');
  }

  handleBackground(e) {
    e.target.className = 'selected';
    if (this.element != null) {
      this.element.className = null;

    }
    this.element = e.target;
  }

  render() {
    return (
      <div>
        <li className="hide-on-large-only" style={{height:'48px'}}> <a   onClick={this.hideResponsiveMenu} className="clickable"><span className="right red-text">Fechar</span></a></li>
        <li className="hide-on-large-only"> <div className="divider"></div> </li>
        {this.props.listMenu.map(itemMenu =>
          (<li key={itemMenu.url} onClick={this.handleBackground.bind(this)} >
            <Link to={itemMenu.url} onClick={this.hideResponsiveMenu}><i className="material-icons">{itemMenu.iconeMaterial.className}</i>{itemMenu.descricao}</Link>
            <div className="divider"> </div>
          </li>
          ))}
      </div>
    )
  }
}

class SideMenu extends Component {

  componentDidMount() {
    this.props.getMenu();
    this.props.loadProfileImage();
    $(".button-collapse").sideNav();
  }
  render() {

    return (
      <div>
        <ul className="side-nav fixed private-side-nav">
          <ProfileContainer />
          <Links listMenu={this.props.menuState} />
        </ul>
        <ul id="slide-out" className="side-nav">
          <ProfileContainer />
          <Links listMenu={this.props.menuState} />
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return  {
       menuState:state.menu.listMenu
    }
}

const mapDispatchToProps = dispatch => {

  return {
    getMenu: () => {
      dispatch(MenuService.getMenu());
    },
    loadProfileImage:() => {
      dispatch(UserService.loadProfileImage());
    }
  }
}

const SideMenuContainer = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

export default SideMenuContainer;