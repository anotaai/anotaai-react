import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import Toast from '../../../helpers/Toast';
import Icon from '../../../domain/Icon';
import UserService from '../../../services/UserService';
import { getObjectNewState, createInstance } from '../../../helpers/jsonHelper';
import { replaceMask } from '../../../helpers/stringHelper';
import T from 'i18n-react';
//import { MDText } from 'i18n-react';
import FooterPanel from '../../FooterPanel';
import { URL } from '../../../helpers/constants';
import { browserHistory } from 'react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function checkInvalidPassword(state) {

    if (state.usuario.senha !== state.confirmarSenha) {
        const newState = createInstance(state);
        newState.usuario.senha = '';
        newState.confirmarSenha = '';
        Toast.show('senhas.nao.conferem.warning', Icon.WARNING);
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
            UserService.findUsuarioByPhone(telefoneReplace,'usuarios')
               .then(response => {
                     if(response.isValid && response.entity) {
                        this.props.handlePhoneChange(response.entity);                        
                     } else if(response.messages) {
                        Toast.show(response.messages);
                     }
                })
                .catch(error => {
                    Toast.defaultError();
                })
        }
    }

    render() {
        
        const active = (this.props.telefoneRetornado === 'S' ? 'active-label' : '');
        const disabled = (this.props.telefoneRetornado === 'S' ? 'disabled' : '');


        return (
            <div>
                <div className="section" /> 
                <div className="container">
                    <div className="panel-header">
                        <span className="title-header"> <i className="material-icons icon-panel">perm_identity</i> Dados Comprador</span>
                    </div>

                    <div className="panel row">

                        <div className="input-field col s12 m6 l6">
                            <input id="nome" ref={this.props.inputRef} type="text" value={this.props.usuario.nome} name="usuario.nome" disabled={disabled} onChange={this.handleInputChange.bind(this)} required />
                            <label htmlFor="nome" className={active} >
                                <T.span text={{ key: "nome" }} />
                            </label>
                        </div>
                        {this.props.cliente !== undefined &&
                            <div className="input-field col s12 m6 l6">
                                <input id="nomeComercial" type="text" value={this.props.cliente.nomeComercial} name="cliente.nomeComercial" onChange={this.handleInputChange.bind(this)} required />
                                <label htmlFor="nomeComercial">Nome Comercial</label>
                            </div>
                        }
                        {this.props.cliente !== undefined &&
                            <div className="input-field col s12 m6 l6">
                                <MaskedInput id='cpf' value={this.props.cliente.cpf} name="cliente.cpf" onChange={this.handleInputChange.bind(this)} mask="111.111.111-11" required placeholder="Cpf" />
                            </div>
                        }
                        <div className="input-field col s12 m6 l6">
                            <MaskedInput id='telefone' value={this.props.telefone} name="telefone" onChange={this.handlePhoneChange.bind(this)} disabled={disabled} mask="(11) 11111-1111" required placeholder="Telefone" />
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="email" value={this.props.usuario.email} name="usuario.email" className="validate" disabled={disabled} onChange={this.handleInputChange.bind(this)} type="email" />
                            <label htmlFor="email" data-error="Email inválido" className={active}>Email</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="senha" ref="senha" type="password" className="validate" minLength="6" required value={this.props.usuario.senha} name="usuario.senha" onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="senha" data-error="A senha deve conter no mínimo 6 caracteres">Senha</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
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
        this.sendButton = null;
        this.nameInput= null;
        this.state = {
            usuario: { nome: '', email: '', senha: '' },
            confirmarSenha: '',
            telefone: '',
            telefoneRetornado: '' 
        };
    }

     handlePhoneChange(entity) {
        const newState = createInstance(this.state);
        newState.usuario.nome  = entity.nome;
        newState.usuario.email = entity.email;
        newState.telefoneRetornado = 'S';
        this.setState(newState);
     }


    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    clearForm(e) {
        e.preventDefault();
        const newState = createInstance(this.state);
        newState.usuario.nome = '';
        newState.usuario.email = '';
        newState.usuario.senha = '';
        newState.confirmarSenha = '';
        newState.telefone = '';
        this.setState(newState);
        this.nameInput.focus();
    }


    send(e) {

        e.preventDefault();
        const state = checkInvalidPassword(this.state);
        this.context.store.dispatch(showLoading());

        if (state !== undefined) {
            this.setState(state);
        } else {

            this.sendButton.setAttribute("disabled", "disabled");
            UserService.save(this.state.usuario, this.state.telefone).then(response => {
                Toast.show(response.messages);
                if (response.isValid) {
                    browserHistory.push(URL.LOGIN);
                }
            }).catch(error => {
                Toast.defaultError();
            }).then(()=>{
                if(this.sendButton !== undefined) {
                   this.sendButton.removeAttribute("disabled");
                }
                this.context.store.dispatch(hideLoading());
            });
        }

    }

    render() {
        return (
            <form method="post" onSubmit={this.send.bind(this)}>
                <FormUser {... this.state} inputRef={el => this.nameInput = el} handleInputChange={this.handleInputChange.bind(this)} handlePhoneChange={this.handlePhoneChange.bind(this)}  />
                <FooterPanel submitRef={el => this.sendButton = el} clearForm={this.clearForm.bind(this)} label="Enviar" />
            </form>
        )
    }

}

Comprador.contextTypes =  {
    store: React.PropTypes.object.isRequired
}