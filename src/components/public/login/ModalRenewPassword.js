import React, { Component } from 'react'
import Modal from 'react-modal';
import UserService from '../../../services/UserService';
import { USE_CASE } from '../../../helpers/constants'
import { handleInputChange, changeRadio } from '../../../actions/userActionCreator'
import { customModalStyles } from '../../../helpers/constants'
import Toast from '../../../helpers/Toast'
import RadioUser from './RadioUser'
import { connect } from 'react-redux'


class ModalRenewPassword extends Component {


  hideModal() {
    this.props.callbackHideModal();
  }

  renewPassword(e) {
    e.preventDefault();
    UserService.askNewPassword(this.props.modalRenewState.userLogin.usuario).then(response => {
      Toast.show(response.messages);
      if (response.isValid) {
        this.hideModal();
      }
    }).catch(error => {
      console.log('ERRO [components\\public\\login\\ModalRenewPassword.js 27]');
    });
  }

  render() {


    return (
      <Modal isOpen={this.props.showModal} style={customModalStyles} contentLabel="Esqueci a senha">

        <h4 className="center-align">Esqueci a senha</h4>

        <div className="section"></div>

        <form className="col s12" method="post" onSubmit={this.renewPassword.bind(this)}>

          <RadioUser idEmail="idEmailModal" idTelefone="idTelefoneModal" changeRadio={this.props.changeRadio} userLogin={this.props.modalRenewState.userLogin} handleInputChange={this.props.handleInputChange} />

          <button type="submit" className="btn btn-small waves-effect SUCCESS" style={{ marginTop: '10px' }} >Gerar Senha</button>

          <button onClick={this.hideModal.bind(this)} className="btn btn-small waves-effect WARNING" style={{ marginLeft: '5px', marginTop: '10px' }}>Fechar</button>

        </form>
      </Modal>
    );

  }
}

const mapStateToProps = state => {
  return { modalRenewState: state.modalRenew }
}

const mapDispatchToProps = dispatch => {
  return {
    handleInputChange: (e) => {
      dispatch(handleInputChange(USE_CASE.MODAL_RENEW, e.target.name, e.target.value));
    },
    changeRadio: (e) => {
      dispatch(changeRadio(USE_CASE.MODAL_RENEW,e.target.value));
    }
  }
}

const ModalRenewPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ModalRenewPassword);

export default ModalRenewPasswordContainer;