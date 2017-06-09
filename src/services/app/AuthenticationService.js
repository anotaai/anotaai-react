import Base64Service from './Base64Service'
import {COOKIE_USER} from '../../helpers/constants'
import Cookies from 'universal-cookie';
import {getPhoneMask} from '../../helpers/stringHelper'
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

        let d = new Date();
        let expireDate = new Date();
        expireDate.setMinutes(d.getMinutes() + login.sessionTime);
        if (login.keepAlive) {
            expireDate.setFullYear(d.getFullYear() + 1);
        }
        
         const cookies = new Cookies();
         cookies.set(COOKIE_USER, JSON.stringify(loginState), { 'expires': expireDate });

         return loginState;

    }

    static clearCredentials() {
        const cookies = new Cookies();
        cookies.remove(COOKIE_USER)
    }

    static checkUserCookie(store) {
        const cookies = new Cookies();
        const cookieLoginState = cookies.get(COOKIE_USER);
        if (cookieLoginState) {
            store.dispatch(authUser(cookieLoginState));
            browserHistory.push(URL.DASHBOARD);
        }
    }

}