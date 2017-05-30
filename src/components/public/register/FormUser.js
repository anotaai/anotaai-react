import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import Toast from '../../../helpers/Toast';
import Icon from '../../../domain/Icon';
import { replaceMask } from '../../../helpers/stringHelper';
import T from 'i18n-react';
import UserService from '../../../services/UserService';
import { createInstance } from '../../../helpers/jsonHelper';
import { PanelHeader } from '../../panels'

export function checkInvalidPassword(state) {

    if (state.usuario.senha !== state.confirmarSenha) {
        const newState = createInstance(state);
        newState.usuario.senha = '';
        newState.confirmarSenha = '';
        Toast.show('senhas.nao.conferem.warning', Icon.WARNING);
        return newState;
    }
}

export default class FormUser extends Component {
    

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
        
        const activeClass = (this.props.telefoneRetornado === 'S' ? 'active-label' : '');
        const disabled = (this.props.telefoneRetornado === 'S' ? 'disabled' : '');

        return (
            <div>
                <div className="section" /> 
                <div className="container">

                    <PanelHeader icon="perm_identity" label="Dados Comprador" />

                    <div className="panel row">

                        <div className="input-field col s12 m6 l6">
                            <input id="nome" ref={this.props.inputRef} type="text" value={this.props.usuario.nome} name="usuario.nome" disabled={disabled} onChange={this.props.handleInputChange.bind(this)} required />
                            <label htmlFor="nome" className={activeClass} >
                                <T.span text={{ key: "nome" }} />
                            </label>
                        </div>
                        {this.props.cliente !== undefined &&
                            <div className="input-field col s12 m6 l6">
                                <input id="nomeComercial" type="text" value={this.props.cliente.nomeComercial} name="cliente.nomeComercial" onChange={this.props.handleInputChange.bind(this)} required />
                                <label htmlFor="nomeComercial">Nome Comercial</label>
                            </div>
                        }
                        {this.props.cliente !== undefined &&
                            <div className="input-field col s12 m6 l6">
                                <MaskedInput id='cpf' value={this.props.cliente.cpf} name="cliente.cpf" onChange={this.props.handleInputChange.bind(this)} mask="111.111.111-11" required placeholder="Cpf" />
                            </div>
                        }
                        <div className="input-field col s12 m6 l6">
                            <MaskedInput id='telefone' value={this.props.telefone} name="telefone" onChange={this.handlePhoneChange.bind(this)} disabled={disabled} mask="(11) 11111-1111" required placeholder="Telefone" />
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="email" value={this.props.usuario.email} name="usuario.email" className="validate" disabled={disabled} onChange={this.props.handleInputChange.bind(this)} type="email" />
                            <label htmlFor="email" data-error="Email inválido" className={activeClass}>Email</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="senha" ref="senha" type="password" className="validate" minLength="6" required value={this.props.usuario.senha} name="usuario.senha" onChange={this.props.handleInputChange.bind(this)} />
                            <label htmlFor="senha" data-error="A senha deve conter no mínimo 6 caracteres">Senha</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="confirmarSenha" className="validate" type="password" minLength="6" required value={this.props.confirmarSenha} name="confirmarSenha" onChange={this.props.handleInputChange.bind(this)} />
                            <label htmlFor="confirmarSenha" data-error="A senha deve conter no mínimo 6 caracteres">Confirmar Senha</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}