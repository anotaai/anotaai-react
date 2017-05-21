import React, { Component } from 'react'
import MenuService from '../../services/menu/MenuService'
import UserService from '../../services/UserService'
import { Link } from 'react-router'
import { ProfileContainer } from './profile/Profile'
import Toast from '../../helpers/Toast'
import { updatePicture } from '../../actions/pictureActionCreator'
import { connect } from 'react-redux'
import $ from 'jquery'

export class Links extends Component {

  constructor(){
    super();
    this.element = null;
  }

  hideResponsiveMenu() {
    $('.button-collapse').sideNav('hide');
  }

  handleBackground(e) {
    e.target.className = 'selected';
    if(this.element != null) {
      this.element.className =  null;
    }
    this.element = e.target;
   
  }

  render() {
    return (
      <div>
        <li className="hide-on-large-only"> <a href="#" onClick={this.hideResponsiveMenu}><span className="right red-text">Fechar</span></a></li>
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

  constructor() {
    super();
    this.state = { listMenu: []  };
  }

  componentDidMount() {
    
    MenuService.getMenu().then(response => {
      this.setState({ listMenu: response });
    }).catch(error => {
       Toast.defaultError();
    });

    UserService.loadProfileImage().then(response => {
      if(response.entity) {
         const mediaType = response.entity.tipoArquivo.mediaType;
			   const data = 'data:' + mediaType + ';base64,' + response.entity.file;
         this.props.updatePicture(data);
      }
    }).catch(e => {
        Toast.defaultError();
    });

    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown({});
  }
  render() {

    return (
      <div>
        <ul className="side-nav fixed private-side-nav">
          <ProfileContainer idDropdown="dropdownDefault"  />
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

const mapDispatchToProps = dispatch => {
   
   return {
      updatePicture: (picture) => {
         dispatch(updatePicture(picture));
      }
   }
}

const SideMenuContainer = connect(null,mapDispatchToProps)(SideMenu);

export default  SideMenuContainer;




