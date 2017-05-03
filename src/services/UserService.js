import { URL_BACKEND} from '../helpers/constants'
import { buildPhone } from '../helpers/stringHelper'
import { createInstance } from '../helpers/jsonHelper'
import { authUser , unauthUser } from '../actions/authActionCreator'
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
            })
            .then(response => {
                if (response.ok) {
                   return response.json();
                }
                throw Error(response);
            })
            .catch(error => {
              throw Error(error);
            });

    }

    static login(usuarioLogin, keepAlive) {
        return function (dispatch) {
            
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
                     dispatch(unauthUser(json));
                } else {
                    AuthenticationService.setCredentials(json);
                    dispatch(authUser());
                    browserHistory.push(URL.HOME);
                }
            }).catch(error => {
                console.log(error);
                dispatch(unauthUser('Ocorreu um erro ao logar'));
            })

        }
    }

}