import { buildPhone } from '../helpers/stringHelper'
import { createInstance } from '../helpers/jsonHelper'
import { authUser, unauthUser } from '../actions/authActionCreator'
import { browserHistory } from 'react-router'
import { URL } from '../helpers/constants'
import Base64Service from './app/Base64Service'
import AuthenticationService from './app/AuthenticationService'


export default class UserService {


    static getUser(activationCode) {

        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/usuarios/recuperarUsuarioAlteracaoSenha`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: activationCode
        }).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        })
    }

    static changePassword(user) {

        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/usuarios/alterarSenha`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        });

    }

    static askNewPassword(user) {
        const telefone = user.telefone;
        const newUserInstance = createInstance(user);
        newUserInstance.telefone = buildPhone(telefone);

        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/usuarios/solicitarMensagemAlteracaoSenha`,{
                method: 'POST',
                body: JSON.stringify(newUserInstance),
                headers: { 'Content-type': 'application/json' }
        }).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }


    static activation(code) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/usuarios/activation`, {
            headers: { 'Content-type': 'application/json' },
            body: code,
            method: 'POST'
        }).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }

    static save(usuario, telefoneStr) {

        const newUserInstance = createInstance(usuario);
        newUserInstance.telefone = buildPhone(telefoneStr);

        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/usuarios`, {
            method: 'POST',
            body: JSON.stringify(newUserInstance),
            headers: { 'Content-type': 'application/json' }
        }).then(response => {
            return response.json();
        }).catch(error => {
            throw Error(error);
        });

    }

    static logout(login) {

        return new Promise((resolve, reject) => {

            return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/usuarios/logout`, {
                method: 'POST',
                body: JSON.stringify(login),
                headers: { 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response.json());
            }).catch(error => {
                reject(error);
            })

        });
    }

    static dispatchLogout() {

        return dispatch => {
            dispatch(unauthUser());
            browserHistory.push(URL.LOGIN);
        }
    }

    static login(usuarioLogin, keepAlive) {

        return new Promise((resolve, reject) => {

            const newUserLoginInstance = createInstance(usuarioLogin);
            const newUserInstance = createInstance(usuarioLogin.usuario);

            const tipoAcesso = usuarioLogin.usuario.email !== '' ? 'EMAIL' : 'TELEFONE';
            const telefone = usuarioLogin.usuario.telefone;
            const senha = usuarioLogin.usuario.senha;

            newUserLoginInstance.tipoAcesso = tipoAcesso;
            newUserInstance.telefone = buildPhone(telefone);
            newUserInstance.senha = Base64Service.encode(senha);
            newUserLoginInstance.usuario = newUserInstance;

            return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/usuarios/login`, {
                method: 'POST',
                body: JSON.stringify(newUserLoginInstance),
                headers: { 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response.json());
            }).catch(error => {
                reject();
            });
        });

    }


    static dispatchLogin(response) {
        return dispatch => {
            const loginState = AuthenticationService.setCredentials(response);
            dispatch(authUser(loginState));
            browserHistory.push(URL.HOME);
        }
    }

    static loadProfileImage() {
        return new Promise((resolve, reject) => {
            return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/usuarios/profilePhoto`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response.json());
            }).catch(error => {
                reject(error);
            })
        });
    }

    static findUsuarioByPhone(telefoneStr,endpoint) {

        const telefone = buildPhone(telefoneStr); 

        return  fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/${endpoint}/findby/telefone`, {
            method: 'POST',
            body: JSON.stringify(telefone),
            headers: new Headers({
                'Content-type': 'application/json'})
           }).then(response => {
             return response.json();
          }).catch(error => {
             throw Error(error);
          })
    }

}