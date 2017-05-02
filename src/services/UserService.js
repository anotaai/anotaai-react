import { urlBackend} from '../helpers/constants'
import { buildPhone } from '../helpers/stringHelper'
import { authUser , unauthUser } from '../actions/authActionCreator'
import { browserHistory } from 'react-router'
import { urlHome } from '../helpers/constants'


export default class UserService {

    static save(usuario, telefoneStr) {
        
        usuario.telefone = buildPhone(telefoneStr);

        return fetch(`${urlBackend}/rest/usuarios`, {
            method: 'POST',
            body: JSON.stringify(usuario),
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
            
            let tipoAcesso = 'EMAIL';

            if(usuarioLogin.usuario.telefone !== ''){
                usuarioLogin.usuario.telefone = buildPhone(usuarioLogin.usuario.telefone);
                tipoAcesso = 'TELEFONE';
            } 
           
           usuarioLogin.tipoAcesso = tipoAcesso; 
        

            fetch(`${urlBackend}/rest/usuarios/login`, {
                method: 'POST',
                body: JSON.stringify(usuarioLogin),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            }).then(response => {
                
                if (response.ok) {
                    dispatch(authUser());
                    browserHistory.push(urlHome);
                }

               return response.json();
            }).then(response => {
                dispatch(unauthUser(response));
            }).catch(error => {
               dispatch(unauthUser('Ocorreu um erro ao logar'));
            })

        }
    }

}