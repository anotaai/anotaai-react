import React, { Component } from 'react'
import Modal  from 'react-modal';
import UserService from '../../../services/UserService';
import { getObjectNewState } from '../../../helpers/jsonHelper'
import { customModalStyles } from '../../../helpers/constants'
import Toast from '../../../helpers/Toast'
import RadioUser from './RadioUser'

export default class ModalRenewPassword extends Component {

  constructor() {
    super();
    this.state = { userLogin: { usuario: { email: '', telefone: '', senha: '' } } };
  }

  hideModal() {
    this.props.callbackHideModal();
  }

  handleInputChange(e) {
    const newState = getObjectNewState(e.target.name, e.target.value, this.state);
    this.setState(newState);
  }


  renewPassword(e) {
    e.preventDefault();
    UserService.askNewPassword(this.state.userLogin.usuario).then(response => {
        Toast.show(response.messages);
        if(response.isValid) {
          this.hideModal();
        }
    }).catch(error => {
        Toast.defaultError();
    });
  }

  render() {
    

    return (
      <Modal isOpen={this.props.showModal} style={customModalStyles} contentLabel="Esqueci a senha">

        <h4 className="center-align">Esqueci a senha</h4>

         <div className="section"></div>

        <form className="col s12" method="post" onSubmit={this.renewPassword.bind(this)}>

          <RadioUser idEmail="idEmailModal" idTelefone="idTelefoneModal" handleInputChange={this.handleInputChange.bind(this)} />

          <button type="submit" className="btn btn-small waves-effect SUCCESS" style={{ marginTop: '10px' }} >Gerar Senha</button>

          <button onClick={this.hideModal.bind(this)} className="btn btn-small waves-effect WARNING" style={{ marginLeft: '5px', marginTop: '10px' }}>Fechar</button>

        </form>
      </Modal>
    );

  }
}