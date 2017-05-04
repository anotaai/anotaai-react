import Base64Service from './Base64Service'
import {COOKIE_USER} from '../../helpers/constants'
import Cookies from 'universal-cookie';
import {getPhoneMask} from '../../helpers/stringHelper'



export default class AuthenticationService {

    static setCredentials(login) {

        var telefoneStr = login.usuario.telefone.ddd.toString() + login.usuario.telefone.numero.toString();

        var authdata = Base64Service.encode(login.usuario.email + ':' + login.sessionID + ':' + login.usuario.telefone.ddi.toString() + telefoneStr);
        var index = login.usuario.nome.indexOf(' ');
        var primeiroNome = index !== -1 ? login.usuario.nome.substring(0, index) : login.usuario.nome;

        telefoneStr = getPhoneMask(telefoneStr);
        
         const globals = {};
         globals.login = login;
         globals.login.telefoneStr = telefoneStr;
         globals.login.authdata = authdata;
         globals.login.primeiroNome = primeiroNome;

        var d = new Date();
        var expireDate = new Date();
        expireDate.setMinutes(d.getMinutes() + login.sessionTime);
        if (login.keepAlive) {
            expireDate.setFullYear(d.getFullYear() + 1);
        }

        //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
         //Verificar header genérico
         localStorage.setItem('authdata',authdata);
         
         const cookies = new Cookies();
         cookies.set(COOKIE_USER, JSON.stringify(globals), { 'expires': expireDate });

    }

    static clearCredentials() {

    }

}