import CrudService from '../CrudService'


export default class GroupProductService extends CrudService {

    static getEndpoint() {
        return '/caderneta';
    }

     static getConfigurations(name, updateAppointmentBookConfiguration) {
        
        return dispatch => {

            return fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/recuperarPorNome?nome=${name}`
            ).then(json => {
                dispatch(updateAppointmentBookConfiguration(json));
            }).catch(error => {
                throw Error(error);
            });

        }
    }


}