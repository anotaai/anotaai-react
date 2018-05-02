import Base64Service from './Base64Service'
import { CREDENCIAL } from '../../helpers/constants'
import { getPhoneMask } from '../../helpers/stringHelper'
import { browserHistory } from 'react-router'
import { authUser } from '../../actions/authActionCreator'
import { URL } from '../../helpers/constants'

export default class AuthenticationService {

    static setCredentials(login) {

        let telefoneStr = login.usuario.telefone.ddd.toString() + login.usuario.telefone.numero.toString();

        let authdata = Base64Service.encode(login.usuario.email + ':' + login.sessionID + ':' + login.usuario.telefone.ddi.toString() + telefoneStr);
        let index = login.usuario.nome.indexOf(' ');
        let primeiroNome = index !== -1 ? login.usuario.nome.substring(0, index) : login.usuario.nome;

        telefoneStr = getPhoneMask(telefoneStr);
        
        const loginState = {};
        loginState.login = login;
        loginState.login.telefoneStr = telefoneStr;
        loginState.login.authdata = authdata;
        loginState.login.primeiroNome = primeiroNome;
        loginState.login.email = login.usuario.email;
        loginState.login.endereco = 'Rua da Paz';

        let data = JSON.stringify(loginState);

        localStorage.setItem(CREDENCIAL, data);

        return loginState;
    }

    static getCredentials() {
        let data = localStorage.getItem(CREDENCIAL);
        var credencial = null;
        if (data) {
            credencial = JSON.parse(data);
        }
        return credencial;
    }

    static clearCredentials() {
        localStorage.removeItem(CREDENCIAL);
    }

    static checkUser(store) {
        let cookieLoginState = this.getCredentials();
        if (cookieLoginState) {
            store.dispatch(authUser(cookieLoginState));
            browserHistory.push(URL.DASHBOARD);
        }
    }

}