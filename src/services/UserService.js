import { URL_BACKEND} from '../helpers/constants'
import { buildPhone } from '../helpers/stringHelper'
import { createInstance } from '../helpers/jsonHelper'
import { authUser, unauthUser } from '../actions/authActionCreator'
import { browserHistory } from 'react-router'
import { URL } from '../helpers/constants'
import Base64Service from './app/Base64Service'
import AuthenticationService from './app/AuthenticationService'


export default class UserService {

    static save(usuario, telefoneStr) {
        
        const newUserInstance = createInstance(usuario);
        newUserInstance.telefone = buildPhone(telefoneStr);

        return fetch(`${URL_BACKEND}/rest/usuarios`, {
            method: 'POST',
            body: JSON.stringify(newUserInstance),
            headers: new Headers({
                'Content-type': 'application/json'})
            }).then(response => {
                if (response.ok) {
                   return response.json();
                }
                throw Error(response);
            }).catch(error => {
              throw Error(error);
            });

    }

    static logout(login) {
       
       const authdata = 'Basic ' + localStorage.getItem('authdata');

       return  new Promise((resolve,reject) => {
 
           return fetch(`${URL_BACKEND}/rest/usuarios/logout`,{
                method: 'POST',
                body: JSON.stringify(login),
                headers: new Headers(
                    {'Content-type':'application/json'},
                    {'Authorization': authdata})
            }).then(response => {
                resolve(response.json());
            }).catch(error => {
                reject(error);
            })
            
       });
    }

    static dispatchLogout()  {

        return dispatch => {
            dispatch(unauthUser());
            browserHistory.push(URL.LOGIN);
        }
    } 

    static login(usuarioLogin,keepAlive) {

        return new Promise((resolve, reject) => {

            const newUserLoginInstance = createInstance(usuarioLogin);
            const newUserInstance = createInstance(usuarioLogin.usuario);
          
            const tipoAcesso = usuarioLogin.usuario.email !== '' ? 'EMAIL'  : 'TELEFONE';
            const telefone = usuarioLogin.usuario.telefone;
            const senha = usuarioLogin.usuario.senha;
            
            newUserLoginInstance.tipoAcesso = tipoAcesso;
            newUserInstance.telefone = buildPhone(telefone);
            newUserInstance.senha = Base64Service.encode(senha);
            newUserLoginInstance.usuario = newUserInstance;

            return fetch(`${URL_BACKEND}/rest/usuarios/login`, {
                method: 'POST',
                body: JSON.stringify(newUserLoginInstance),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            }).then(response => {
                return response.json();
            }).then(json => {
                if (json.anotaaiExceptionMessages) {
                    reject(json);
                } else {
                    resolve(json);
                }
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

}