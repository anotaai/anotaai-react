import React, { Component } from 'react'
import { RadioUser } from './Login'
import  Modal  from 'react-modal';

export default class ModalRenewPassword extends Component {

  constructor() {
    super();
    this.state = { email: '', telefone: '' };
  }

  hideModal() {
    this.props.callbackHideModal();
  }

  handleInputChange(value, name) {
    this.setState({ [name]: value });
  }


  renewPassword(e) {
    e.preventDefault();
    console.log(this.state.telefone);
    console.log(this.state.email);
  }

  render() {

    const customStyles = {
      content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '30px',
        transform: 'translate(-50%, -50%)',

      }
    };

    return (
      <Modal isOpen={this.props.showModal} style={customStyles} contentLabel="Esqueci a senha">

        <h4 className="center-align">Esqueci a senha</h4>

        <div className="section"></div>

        <form className="col s12" method="post" onSubmit={this.renewPassword.bind(this)}>

          <RadioUser idEmail="idEmailModal" idTelefone="idTelefoneModal" handleInputChange={this.handleInputChange.bind(this)} />

          <button type="submit" className="btn btn-small waves-effect success" style={{ marginTop: '10px' }} >Gerar Senha</button>

          <button onClick={this.hideModal.bind(this)} className="btn btn-small waves-effect warning" style={{ marginLeft: '5px', marginTop: '10px' }}>Fechar</button>

        </form>
      </Modal>
    );

  }
}