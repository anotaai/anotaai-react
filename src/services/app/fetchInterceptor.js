import fetchIntercept from 'fetch-intercept';
import Cookies from 'universal-cookie';
import { COOKIE_USER } from '../../helpers/constants';
import Toast from '../../helpers/Toast';
import { Icon } from '../../domain/Icon'
import UserService from '../../services/UserService'

export default function registerFetchInterceptor(store) {

    fetchIntercept.register({
        request(url, config) {
            const cookies = new Cookies();
            const cookieLoginState = cookies.get(COOKIE_USER);
            if(cookieLoginState != null) {
               const headerName =   'Authorization';
               const headerValue = 'Basic ' + cookieLoginState.login.authdata;
               if (config !== undefined) {
                   const headers = config.headers !== undefined ? new Headers(config.headers) : new Headers();
                   headers.append(headerName, headerValue);
                   config.headers = headers;
               } else {
                   //requisições sem objeto de configuracao porém que exigem o header de autenticacao
                   const headers = new Headers();
                   headers.append(headerName, headerValue);
                   config = {headers: headers};
               }
            } 
            return [url, config];
        },

        response(response) {
            switch (response.status) {
                case 200:
                    //response = response.json()
                    break;
                case 401:
                    console.log('401');
                    break;
                case 403:
                    Toast.show('message.login.forbidden', Icon.WARNING);
                    store.dispatch(UserService.dispatchLogout());
                    break;
                default:
                    break;
            }
            return response;
        }
    });
}