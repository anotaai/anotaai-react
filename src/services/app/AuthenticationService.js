import Base64Service from './Base64Service'
 
import Cookies from 'universal-cookie';



export default class AuthenticationService {

    static setCredentials(login) {

        var telefoneStr = login.usuario.telefone.ddd.toString() + login.usuario.telefone.numero.toString();

        var authdata = Base64Service.encode(login.usuario.email + ':' + login.sessionID + ':' + login.usuario.telefone.ddi.toString() + telefoneStr);
        var index = login.usuario.nome.indexOf(' ');
        var primeiroNome = index !== -1 ? login.usuario.nome.substring(0, index) : login.usuario.nome;

        telefoneStr = telefoneStr.replace(/^(\d{2})(\d)/g, "($1) $2");
        telefoneStr = telefoneStr.replace(/(\d)(\d{4})$/, "$1-$2");
        
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
         const cookies = new Cookies();
         cookies.set(login.cookieSessionName, JSON.stringify(globals), { 'expires': expireDate });

    }

    static clearCredentials() {

    }

}