import React, { Component } from 'react';
import Toast from '../../../helpers/Toast';
import { getObjectNewState, createInstance } from '../../../helpers/jsonHelper';
import { PanelFooter } from '../../panels'
import { URL } from '../../../helpers/constants';
import { browserHistory } from 'react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { connect } from 'react-redux'
import FormUser , { checkInvalidPassword } from './FormUser';
import UserService from '../../../services/UserService';

class Comprador extends Component {

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
            });
        }

    }

    render() {
        return (
            <form method="post" onSubmit={this.send.bind(this)}>
                <FormUser {... this.state} inputRef={el => this.nameInput = el} handleInputChange={this.handleInputChange.bind(this)} handlePhoneChange={this.handlePhoneChange.bind(this)}  />
                <PanelFooter submitRef={el => this.sendButton = el} clearForm={this.clearForm.bind(this)} label="Enviar" isPublic={true} />
            </form>
        )
    }

}


const mapDispatchToProps = dispatch => {

    return {
        showLoading: () => {
            dispatch(showLoading());
        },
        hideLoading: () => {
            dispatch(hideLoading());
        }
    }
}

const CompradorContainer = connect(null,mapDispatchToProps)(Comprador);

export default CompradorContainer;

