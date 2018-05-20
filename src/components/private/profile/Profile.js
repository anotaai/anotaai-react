import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserService from '../../../services/UserService';
import { URL } from '../../../helpers/constants';
import { toggleResponsiveMenu }  from '../../../actions/menuActionCreator';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { CSSTransitionGroup } from 'react-transition-group'
import { push } from '../../App'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

class Profile extends Component {

    logout(e) {
        e.preventDefault();
        UserService.logout(this.props.loginState.login).then(response => {
            this.hideResponsiveMenu();
            this.props.logout();
        }).catch(error => {
            console.log('ERRO [components\\private\\profile\\Profile.js 40]');
        });
    }
    
    pushDropdown(url) {
       this.refs.dropdownProfile.hide();
       this.hideResponsiveMenu();
       push(url);
    }

    hideResponsiveMenu() {

        if(this.props.menuState.showResponsiveMenu) {
            this.props.toggleResponsiveMenu();
        }

    }

    render() {
        return (
            <div>
                <li>
                    <div className="userView profile-details">
                        <div className="row">
                            <div className="col col s4 m4 l4">
                                <CSSTransitionGroup
                                    transitionName="anotaai"
                                    transitionAppear={true}
                                    transitionEnter={false}
                                    transitionLeave={false}
                                    transitionAppearTimeout={500}>
                                    <img src={this.props.pictureState} className="circle responsive-img profile-image" style={{ cursor: 'pointer' }} title="Settings" alt={this.props.loginState.login.primeiroNome} onClick={push.bind(this, URL.SETTINGS)} />
                                </CSSTransitionGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col s11 m11 l11">
                                <Dropdown ref="dropdownProfile">
                                    <DropdownTrigger className="btn-flat profile-btn waves-effect waves-light white-text">{this.props.loginState.login.primeiroNome}</DropdownTrigger>
                                    <DropdownContent>
                                        <ul id={this.props.idDropdown}>
                                            <li><a onClick={this.pushDropdown.bind(this,URL.SETTINGS)} className="clickable">Settings<i className="material-icons">settings</i></a></li>
                                            <li className="divider"></li>
                                            <li><a className="clickable" onClick={this.logout.bind(this)} >Logout<i className="material-icons">power_settings_new</i></a></li>
                                        </ul>
                                    </DropdownContent>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { loginState: state.auth.loginState, pictureState: state.profilePicture.pictureState , menuState: state.menu }
}

const mapDispatchToPros = dispatch => {
    return {
        logout: () => {
            dispatch(UserService.dispatchLogout());
        },
        showLoading: () => {
            dispatch(showLoading());
        },
        hideLoading: () => {
            dispatch(hideLoading());
        },
        toggleResponsiveMenu: () => {
            dispatch(toggleResponsiveMenu());
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToPros)(Profile);

export { ProfileContainer };