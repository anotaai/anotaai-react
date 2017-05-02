import { urlBackend} from '../helpers/constants'
import { buildPhone } from '../helpers/stringHelper'
import { createInstance } from '../helpers/jsonHelper'
import { authUser , unauthUser } from '../actions/authActionCreator'
import { browserHistory } from 'react-router'
import { urlHome } from '../helpers/constants'


export default class UserService {

    static save(usuario, telefoneStr) {
        
        const newUserInstance = createInstance(usuario);
        newUserInstance.telefone = buildPhone(telefoneStr);

        return fetch(`${urlBackend}/rest/usuarios`, {
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
            
            newUserLoginInstance.tipoAcesso = tipoAcesso;
            newUserInstance.telefone = buildPhone(telefone);
            newUserLoginInstance.usuario = newUserInstance;


            return fetch(`${urlBackend}/rest/usuarios/login`, {
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
                    dispatch(authUser());
                    browserHistory.push(urlHome);
                }
            }).catch(error => {
                dispatch(unauthUser('Ocorreu um erro ao logar'));
            })

        }
    }

}