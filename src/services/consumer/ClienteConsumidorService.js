import CrudService from '../CrudService'

export default class ClienteConsumidorService extends CrudService {


    static getEndpoint() {
        return '/rest/clienteconsumidor';
    }

}