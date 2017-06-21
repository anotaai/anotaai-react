import CrudService from '../CrudService'
import { buildPhone } from '../../helpers/stringHelper'
import { createInstance } from '../../helpers/jsonHelper'


export default class ClienteConsumidorService extends CrudService {


    static getEndpoint() {
        return '/rest/clienteconsumidor';
    }

    static getPhone(clienteConsumidor) {
        const telefone = clienteConsumidor.consumidor.usuario.telefone;
        const newUserInstance = createInstance(clienteConsumidor);
        newUserInstance.consumidor.usuario.telefone = buildPhone(telefone);
        return newUserInstance;
    }
 
}