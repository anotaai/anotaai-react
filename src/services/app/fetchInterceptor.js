import fetchIntercept from 'fetch-intercept'
import Cookies from 'universal-cookie'
import { COOKIE_USER } from '../../helpers/constants'

export default function registerFetchInterceptor() {

    fetchIntercept.register({
        request(url, config) {
            const cookies = new Cookies();
            const cookieLoginState = cookies.get(COOKIE_USER);
            if(cookieLoginState != null) {
               const authorizationHeader = { 'Authorization' : 'Basic ' + cookieLoginState.login.authdata };
               if(config !== undefined) {
                  // TODO - avaliar - config.headers = {...config.headers,authorizationHeader};
                  config.headers = authorizationHeader;
               } else {
                   config = {headers: authorizationHeader}; 
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
                    console.log('403');
                    break;
                default:
                    break;
            }
            return response;
        }
    });
}