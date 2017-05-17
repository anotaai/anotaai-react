import React, { Component } from 'react'
import Toast from '../../../helpers/Toast'
import { Icon } from '../../../domain/Icon'
import { connect } from 'react-redux'
import ProfileService from '../../../services/profile/ProfileService'
import { updatePicture } from '../../../actions/pictureActionCreator'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import PictureContainer from './Picture'


class Settings extends Component {

    handleDrop(file, rejected) {
        if (rejected.length > 0) {
            Toast.show('formatos.permitidos.warning', Icon.WARNING);
        } else {
           const picture = file[0];
            
           this.context.store.dispatch(showLoading());

            ProfileService.upload(picture).then(response => {
                if(response.isValid) {
                    this.setState({ picture });
                    this.context.store.dispatch(updatePicture(picture.preview));
                }
            }).catch(error => {
                Toast.defaultError();
            }).then(response => {
              this.context.store.dispatch(hideLoading());
            });
        }
    }
    

    render() {

        return (
            <div>
                <div className="section"></div>
                <div className="container">
                    <div className="z-depth-1 panel-header" >
                        <span className="title-header"> <i className="material-icons icon-panel">account_circle</i> User Settings </span>
                    </div>
                    <div className="z-depth-1 panel row">
                        <div className="row">
                            <PictureContainer handleDrop={this.handleDrop.bind(this)}  />
                            <div className="col s12 m12 l6">
                                <div className="row">
                                    <label className="settings-title">Personal Information</label>
                                </div>
                                <div className="row">
                                    <label style={{ fontWeight: 'bold' }}> Nome </label>
                                    <label> {this.props.loginState.login.primeiroNome} </label>
                                    <hr></hr>
                                </div>
                                <div className="row">
                                    <label style={{ fontWeight: 'bold' }}> Telefone </label>
                                    <label> {this.props.loginState.login.telefoneStr} </label>
                                    <hr></hr>
                                </div>
                                {this.props.loginState.login.email !== null &&
                                    <div className="row">
                                        <label style={{ fontWeight: 'bold' }}> Email </label>
                                        <label> {this.props.loginState.login.email} </label>
                                        <hr></hr>
                                    </div>
                                }

                                {this.props.loginState.login.endereco !== null &&
                                    <div className="row">
                                        <label style={{ fontWeight: 'bold' }}> Endereço </label>
                                        <label> {this.props.loginState.login.endereco} </label>
                                        <hr></hr>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="section"></div>
            </div>
        )
    }

}


Settings.contextTypes = {
  store: React.PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {loginState: state.auth.loginState}
}


const SettingsContainer = connect(mapStateToProps)(Settings);

export default SettingsContainer;