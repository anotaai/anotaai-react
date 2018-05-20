import { buildPhone } from '../helpers/stringHelper'
import { createInstance } from '../helpers/jsonHelper'
import Toast from '../helpers/Toast'
import { USE_CASE } from '../helpers/constants'
import { authUser, unauthUser } from '../actions/authActionCreator'
import { updateComprador } from '../actions/compradorActionCreator'
import { updatePicture } from '../actions/pictureActionCreator'
import { updateUser } from '../actions/userActionCreator'
import { browserHistory } from 'react-router'
import { URL } from '../helpers/constants'
import Base64Service from './app/Base64Service'
import AuthenticationService from './app/AuthenticationService'
import AsyncService from '../services/AsyncService'

export default class UserService {

    static getEndpoint() {
        return '/usuarios';
    }

    static getUser(activationCode) {
        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/recuperarUsuarioAlteracaoSenha`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: activationCode
            }).then(json => {
                return dispatch(updateUser(USE_CASE.RENEW, json.entity, activationCode));
            }).catch(error => {
                console.log('ERRO [services\\UserService.js 31]');
            })
        }

    }

    static getUserByActivationKey(key) {
        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/byactivationcode`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: key
            }).then(json => {
                if (json.isValid) {
                    return dispatch(updateComprador(json.entity));
                } else {
                    Toast.show(json.messages);
                }
            }).catch(error => {
                console.log('ERRO [services\\UserService.js 51]');
            })
        }

    }

    static changePassword(user, component) {
        
        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/alterarSenha`, [component] ,  {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user)
        });

    }

    static askNewPassword(user) {
        const telefone = user.telefone;
        const newUserInstance = createInstance(user);
        newUserInstance.telefone = buildPhone(telefone);

        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/solicitarMensagemAlteracaoSenha`, {
            method: 'POST',
            body: JSON.stringify(newUserInstance),
            headers: { 'Content-type': 'application/json' }
        }).catch(error => {
            throw Error(error);
        });
    }


    static activation(code) {
        return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/activation`, {
            headers: { 'Content-type': 'application/json' },
            body: code,
            method: 'POST'
        }).catch(error => {
            throw Error(error);
        });
    }

    static save(usuario, telefoneStr, component) {

        const newUserInstance = createInstance(usuario);
        newUserInstance.telefone = buildPhone(telefoneStr);

        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}`, [component],  {
            method: 'POST',
            body: JSON.stringify(newUserInstance),
            headers: { 'Content-type': 'application/json' }
        });

    }


    static activationUser(usuario, telefoneStr, component) {

        const newUserInstance = createInstance(usuario);
        newUserInstance.telefone = buildPhone(telefoneStr);

        return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/activationuser`, [component],  {
            method: 'POST',
            body: JSON.stringify(newUserInstance),
            headers: { 'Content-type': 'application/json' }
        });
    }

    static logout(login) {
        return new Promise((resolve, reject) => {
            return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/logout`, {
                method: 'POST',
                body: JSON.stringify(login),
                headers: { 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
        });
    }

    static dispatchLogout() {
        return dispatch => {
            AuthenticationService.clearCredentials();
            dispatch(unauthUser());
            browserHistory.push(URL.LOGIN);
        }
    }

    static login(userLogin, keepAlive, component) {
        return new Promise((resolve, reject) => {
            const newUserLoginInstance = createInstance(userLogin);
            const newUserInstance = createInstance(userLogin.usuario);
            const telefone = userLogin.usuario.telefone;
            const senha = userLogin.usuario.senha;

            newUserLoginInstance.tipoAcesso = userLogin.tipoAcesso;
            newUserInstance.telefone = buildPhone(telefone);
            newUserInstance.senha = Base64Service.encode(senha);
            newUserLoginInstance.usuario = newUserInstance;
            newUserLoginInstance.keepAlive = keepAlive;

            AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/login`, [component] , {
                method: 'POST',
                body: JSON.stringify(newUserLoginInstance),
                headers: { 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    }


    static dispatchLogin(response) {
        return dispatch => {
            const loginState = AuthenticationService.setCredentials(response);
            dispatch(authUser(loginState));
            browserHistory.push(URL.DASHBOARD);
        }
    }

    static loadProfileImage() {
        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/profilePhoto`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            }).then(json => {
                if (json.entity != null) {
                    const mediaType = json.entity.tipoArquivo.mediaType;
                    const picture = 'data:' + mediaType + ';base64,' + json.entity.file;
                    dispatch(updatePicture(picture));
                }
            }).catch(error => {
                console.log('ERRO [services\\UserService.js 187]');
            })
        };
    }

    static findUsuarioByPhone(telefoneStr, endpoint) {

        const telefone = buildPhone(telefoneStr);

        return fetch(`${process.env.REACT_APP_URL_BACKEND}/${endpoint}/findby/telefone`, {
            method: 'POST',
            body: JSON.stringify(telefone),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(json => {
            console.log(json, 'telefone jah cadastrado')
        }).catch(error => {
            throw Error(error);
        })
    }

}