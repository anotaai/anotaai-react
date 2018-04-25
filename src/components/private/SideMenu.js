import React, { Component } from 'react'
import MenuService from '../../services/menu/MenuService'
import { Link } from 'react-router'
import { ProfileContainer } from './profile/Profile'
import UserService from '../../services/UserService'
import { connect } from 'react-redux'
import { toggleResponsiveMenu } from  '../../actions/menuActionCreator';
import T from 'i18n-react';

export class Links extends Component {

  constructor() {
    super();
    this.element = null;
  }

   hideResponsiveMenu() {
       if(this.props.menuState.showResponsiveMenu){
           this.props.toggleResponsiveMenu();
       }
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
        {this.props.menuState.showResponsiveMenu &&
           <li style={{height:'48px'}}> <a onClick={this.hideResponsiveMenu.bind(this)} className="clickable"><span className="right red-text">Fechar</span></a></li> 
        }
        <li className="hide-on-large-only"> <div className="divider"></div> </li>
        {this.props.listMenu.map(itemMenu =>
          (<li key={itemMenu.url} onClick={this.handleBackground.bind(this)} >
            <Link to={itemMenu.url} onClick={this.hideResponsiveMenu.bind(this)}><i className="material-icons">{itemMenu.icone.className}</i>{T.translate(itemMenu.key)}</Link>
            <div className="divider"> </div>
          </li>
         ))}
      </div>
    )
  }
  
}

const mapLinksStateToProps = state => {
     return { menuState: state.menu }
}

const mapLinksDispatchToProps = dispatch =>  {
     return {
        toggleResponsiveMenu: () => {
           dispatch(toggleResponsiveMenu());
        }
     }
}

const LinksContainer = connect(mapLinksStateToProps,mapLinksDispatchToProps)(Links);

class SideMenu extends Component {

  componentDidMount() {
    this.props.getMenu();
    this.props.loadProfileImage();
  }
  render() {

    return (
      <div>
        <ul className="side-nav fixed private-side-nav">
          <ProfileContainer />
          <LinksContainer listMenu={this.props.menuState.listMenu} />
        </ul>
        <ul className={"side-nav " + this.props.menuState.classResponsiveMenu}>
          <ProfileContainer />
          <LinksContainer listMenu={this.props.menuState.listMenu} />
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return  {
       menuState:state.menu 
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