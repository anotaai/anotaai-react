import fetchIntercept from 'fetch-intercept';
import Toast from '../../helpers/Toast';
import { Icon } from '../../domain/Icon';
import UserService from '../../services/UserService';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import hideModalRenewLogin from '../../components/RenewLogin';
import AuthenticationService from '../app/AuthenticationService';

export default function registerFetchInterceptor(store) {

    fetchIntercept.register({
        request(url, config) {
            store.dispatch(showLoading());
            const cookieLoginState = AuthenticationService.getCredentials();
            if (cookieLoginState != null) {
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
            store.dispatch(hideLoading());
            switch (response.status) {
                case 200:
                    if (response.url.indexOf('rest/i18n/locales') === -1) {
                        return response.json();
                    } else {
                        return response;
                    }
                case 401:
                    Toast.show('security.access.unauthorized', Icon.WARNING);
                    return Promise.reject(new Error(response));
                case 403:
                    Toast.show('security.session.timeout', Icon.WARNING);
                    store.dispatch(UserService.dispatchLogout());
                    store.dispatch(hideModalRenewLogin());
                    return Promise.reject(new Error(response));
                case 500:
                    Toast.defaultError();
                    return Promise.reject(new Error(response));
                default:
                    return Promise.reject(new Error(response));
            }
        },

        requestError: function (error) {
            store.dispatch(hideLoading());
            console.log(error);
            return Promise.reject(error);
        },

        responseError: function (error) {
            store.dispatch(hideLoading());
            console.log(error);
            return Promise.reject(error);
        }
    });

}