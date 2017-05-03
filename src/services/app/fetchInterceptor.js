import fetchIntercept from 'fetch-intercept'

export default function registerFetchInterceptor() {

    fetchIntercept.register({
        request(url, config) {
            return [url, config];
        },
        
        response(response) {
            switch (response.status) {
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