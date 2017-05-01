import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'
import ClienteConsumidorService from '../../../services/client/ClienteConsumidorService'
import ShowMessage from '../../../helpers/ShowMessage'
import UserService from '../../../services/UserService'
import {toastWarning, toastInfo, toastError} from '../../../helpers/constants'
import {getObjectNewState, createInstance} from '../../../helpers/jsonHelper'
import {replaceMask} from '../../../helpers/stringHelper'
import FooterPanel from '../FooterPanel'
import T from 'i18n-react';

export function checkInvalidPassword(state) {
    
    if(state.usuario.senha !== state.confirmarSenha) {
        const newState = createInstance(state);
        newState.usuario.senha = '';
        newState.confirmarSenha = '';
        ShowMessage.show("A senha não confere com a confirmação de senha. Informe novamente.", toastWarning);
        return newState;
    }
}

export class FormUser extends Component {

    handleInputChange(e) {
        this.props.handleInputChange(e);
    }
     
    handlePhoneChange(e) {
        const telefone = e.target.value;
        const telefoneReplace = replaceMask(telefone);
        const finalizouTelefone = telefoneReplace.indexOf('_');
        this.props.handleInputChange(e);

        if (finalizouTelefone === -1 && telefoneReplace !== '') {
            ClienteConsumidorService.findUsuarioByPhone(telefoneReplace)
                .then(response => {
                    alert(response);
                })
                .catch(error => {
                    ShowMessage.show('Ocorreu um erro ao recuperar o telefone do usuário', toastError);
                })
        } 
    }

    render() {
        return (
           <div>
            <div className="section"></div>
             <div className="container">  
                <div className="z-depth-1 panel-header">
                    <span className="title-header">Dados Comprador</span>
                </div>
                
                <div className="z-depth-1 panel row">

                    <div className="input-field col s6">
                        <input id="nome" ref="nome" type="text" value={this.props.usuario.nome} name="usuario.nome" onChange={this.handleInputChange.bind(this)} required />
                        <label htmlFor="nome">
                            <T.span text={{ key: "nome", myName: "i18n-react" }}/>
                        </label>
                    </div>
                    {this.props.cliente !== undefined &&
                        <div className="input-field col s6">
                            <input id="nomeComercial" type="text" value={this.props.cliente.nomeComercial} name="cliente.nomeComercial" onChange={this.handleInputChange.bind(this)} required />
                            <label htmlFor="nomeComercial">Nome Comercial</label>
                        </div>
                    }
                    {this.props.cliente !== undefined &&
                        <div className="input-field col s6">
                            <MaskedInput id='cpf' value={this.props.cliente.cpf} name="cliente.cpf" onChange={this.handleInputChange.bind(this)} mask="111.111.111-11" required placeholder="Cpf" />
                        </div>
                    }
                    <div className="input-field col s6">
                        <MaskedInput id='telefone' value={this.props.telefone} name="telefone" onChange={this.handleInputChange.bind(this)} mask="(11) 11111-1111" required placeholder="Telefone" />
                    </div>
                    <div className="input-field col s6">
                        <input id="email" value={this.props.usuario.email} name="usuario.email" className="validate" onChange={this.handleInputChange.bind(this)} type="email" />
                        <label htmlFor="email" data-error="Email inválido">Email</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="senha" ref="senha" type="password" className="validate" minLength="6" required value={this.props.usuario.senha} name="usuario.senha" onChange={this.handleInputChange.bind(this)} />
                        <label htmlFor="senha" data-error="A senha deve conter no mínimo 6 caracteres">Senha</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="confirmarSenha" className="validate" type="password" minLength="6" required value={this.props.confirmarSenha} name="confirmarSenha" onChange={this.handleInputChange.bind(this)} />
                        <label htmlFor="confirmarSenha" data-error="A senha deve conter no mínimo 6 caracteres">Confirmar Senha</label>
                    </div>
                </div>
            </div>
           </div>   
        )
    }

}
 

export default class Comprador extends Component {

   constructor() {
        super();
        this.state = {
            usuario: { nome: '', email: '', senha: '' },
            confirmarSenha: '',
            telefone: ''
        };
    }

    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    clearForm(e) {
        e.preventDefault();
        const newState = createInstance(this.state.usuario);
        newState.usuario.nome = '';
        newState.usuario.email = '';
        newState.usuario.senha = '';
        newState.confirmarSenha = '';
        newState.telefone = '';
        this.setState(newState);
        //ReactDOM.findDOMNode(this.refs.nome).focus();
    }


    send(e) {
        e.preventDefault();
         
      const state = checkInvalidPassword(this.state);

      if(state !== undefined) {           
            this.setState(state);
            //ReactDOM.findDOMNode(this.refs.senha).focus();
         } else {
            UserService.save(this.state.usuario, this.state.telefone).then(response => {
                ShowMessage.show("Sucesso", toastInfo);
            }).catch(error => {
                ShowMessage.show('Ocorreu um erro ao incluir o usuário', toastError);
            });
         }

    }

    render() {
        return(
          <form method="post" onSubmit={this.send.bind(this)}>
             <FormUser usuario={this.state.usuario} telefone={this.state.telefone}  confirmarSenha={this.state.confirmarSenha} handleInputChange={this.handleInputChange.bind(this)}  />
             <FooterPanel clearForm={this.clearForm.bind(this)}  />
          </form> 
        )
    }
  
}