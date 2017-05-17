import React, { Component } from 'react'
import MenuService from '../../services/menu/MenuService'
import UserService from '../../services/UserService'
import { Link } from 'react-router'
import { ProfileContainer } from './profile/Profile'
import Toast from '../../helpers/Toast'
import { updatePicture } from '../../actions/pictureActionCreator'
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
         this.context.store.dispatch(updatePicture(data));
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

SideMenu.contextTypes = {
  store: React.PropTypes.object.isRequired
}



