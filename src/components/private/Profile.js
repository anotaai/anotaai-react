import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import AuthenticationService from '../../services/app/AuthenticationService'
import UserService from '../../services/UserService'
import blank_avatar from '../../img/blank_avatar.png'
import { ShowMessage } from '../../helpers/ShowMessage'

class Profile extends Component {

    constructor() {
        super();
        this.state = { showModal: false };
    }

    logout(e) {
        e.preventDefault();
        UserService.logout(this.props.loginState).then(response => {
            $('.button-collapse').sideNav('hide');
        }).catch(error => {
            ShowMessage.error();
        });
        AuthenticationService.clearCredentials();
        this.context.store.dispatch(UserService.dispatchLogout());
    }

    showSettings(e) {
        e.preventDefault();
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <li>
                    <div className="userView profile-details">
                        <div className="row">
                            <div className="col col s4 m4 l4">
                                <img src={blank_avatar} alt="Avatar" className="circle responsive-img profile-image" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col s8 m8 l8">
                                <a className="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#" data-activates={this.props.idDropdown}>{this.props.loginState.login.primeiroNome}<i className="material-icons right">arrow_drop_down</i></a>
                                <ul id={this.props.idDropdown} className="dropdown-content">
                                    <li><a href="#" onClick={this.showSettings.bind(this)}>Settings<i className="material-icons">settings</i></a></li>
                                    <li className="divider"></li>
                                    <li><a href="#!" onClick={this.logout.bind(this)} >Logout<i className="material-icons">power_settings_new</i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        );
    }
}

Profile.contextTypes = {
    store: React.PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return { loginState: state.auth.loginState }
}

const ProfileContainer = connect(mapStateToProps)(Profile);

export { ProfileContainer };