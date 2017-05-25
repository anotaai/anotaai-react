import React, { Component } from 'react'
import Toast from '../../../helpers/Toast'
import { Icon } from '../../../domain/Icon'
import { connect } from 'react-redux'
import ProfileService from '../../../services/profile/ProfileService'
import { updatePicture } from '../../../actions/pictureActionCreator'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import PictureContainer from './Picture'
import { PanelHeader } from '../../panels'


class Settings extends Component {

    handleDrop(file, rejected) {
        if (rejected.length > 0) {
            Toast.show('formatos.permitidos.warning', Icon.WARNING);
        } else {
            const picture = file[0];
            this.props.showLoading();
            ProfileService.upload(picture).then(response => {
                if(response.isValid) {
                    Toast.show('sucesso.upload', Icon.DONE);
                    this.setState({ picture });
                    this.props.updatePicture(picture.preview);
                }
            }).catch(error => {
                Toast.defaultError();
            }).then(response => {
                this.props.hideLoading();
            });
        }
    }

    render() {

        return (
            <div className="space-container">
                <div className="container">
                    
                    <PanelHeader label="User Settings" icon="settings" />
                    
                    <div className="panel row">
                        <div className="row">
                            <PictureContainer handleDrop={this.handleDrop.bind(this)}  />
                            <div className="col s12 m12 l6">
                                <div className="row">
                                    <label className="settings-title"><i className="material-icons icon-panel">account_circle</i> Personal Information</label>
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
            </div>
        )
    }

}


const mapDispatchToProps = dispatch => {
  return {
    updatePicture : (picturePreview) => {
      dispatch(updatePicture(picturePreview));
    },
    showLoading:() => {
      dispatch(showLoading());
    },
    hideLoading:() => {
      dispatch(hideLoading());
    }
  }
} 

const mapStateToProps = state => {
    return {loginState: state.auth.loginState}
}

const SettingsContainer = connect(mapStateToProps,mapDispatchToProps)(Settings);

export default SettingsContainer;