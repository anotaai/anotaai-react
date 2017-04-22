import React, { Component } from 'react'
import {RadioUsuario} from './Login'
import Modal from 'react-modal';

export default class ModalRenovarSenha extends Component {
 
  hideModal() {
    this.props.callbackHideModal();
  }

  changeEmail(email) {
    this.email = email;
  }

  changeTelefone(telefone) {
    this.telefone = telefone;
  }

  gerarNovaSenha(e) {
    e.preventDefault();
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
        
         <form className="col s12" method="post" onSubmit={this.gerarNovaSenha.bind(this)}>
        
          <RadioUsuario  idEmail="idEmailModal"  idTelefone="idTelefoneModal" callbackEmail={this.changeEmail.bind(this)} callbackTelefone={this.changeTelefone.bind(this)} />

          <button type="submit"  className="btn btn-small waves-effect success"   style={{marginTop:'10px'}} >Gerar Senha</button>
          
          <button onClick={this.hideModal.bind(this)} className="btn btn-small waves-effect warning" style={{marginLeft:'5px',marginTop:'10px'}}>Fechar</button>
      
         </form>
      </Modal>
    );

  }
}