import React, { Component } from 'react'
import {RadioUsuario} from './Login'
import Modal from 'react-modal';

export default class ModalRenovarSenha extends Component {
 
   
   componentWillMount() {
    this.state = { showModal: true };
   }

  closeModal() {
    this.setState({ showModal: false });
  }

  changeEmail(email) {
    this.email = email;
  }

  changeTelefone(telefone) {
    this.telefone = telefone;
  }


  render() {

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

      }
    };

    return (
      <Modal isOpen={this.state.showModal} style={customStyles} contentLabel="Example Modal">

        <h4>Modal Header</h4>
         <form className="col s12" method="post">
        
         <RadioUsuario  idEmail="idEmailModal"  idTelefone="idTelefoneModal" nomeRadio="radioModal"   callbackEmail={this.changeEmail.bind(this)} callbackTelefone={this.changeTelefone.bind(this)} />

         <button onClick={this.closeModal.bind(this)} className="btn btn-large waves-effect indigo">Close</button>
        
        </form>

      </Modal>
    );

  }
}