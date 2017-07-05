import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import UserService from '../../../services/UserService'
import Toast from '../../../helpers/Toast'
import { URL } from '../../../helpers/constants'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { CSSTransitionGroup } from 'react-transition-group'
import { push } from '../../App'

class Profile extends Component {


    logout(e) {
        e.preventDefault();

        UserService.logout(this.props.loginState).then(response => {
            $('.button-collapse').sideNav('hide');
            this.props.logout();
        }).catch(error => {
            Toast.defaultError();
        });
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
                                <a className="btn-flat dropdown-button waves-effect waves-light white-text profile-btn clickable"   data-activates={this.props.idDropdown}>{this.props.loginState.login.primeiroNome}<i className="material-icons right">arrow_drop_down</i></a>
                                <ul id={this.props.idDropdown} className="dropdown-content">
                                    <li><a  onClick={push.bind(this, URL.SETTINGS)} className="clickable">Settings<i className="material-icons">settings</i></a></li>
                                    <li className="divider"></li>
                                    <li><a className="clickable" onClick={this.logout.bind(this)} >Logout<i className="material-icons">power_settings_new</i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { loginState: state.auth.loginState, pictureState: state.profilePicture.pictureState }
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
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToPros)(Profile);

export { ProfileContainer };