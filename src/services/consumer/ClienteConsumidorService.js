import CrudService from '../CrudService'
import { buildPhone } from '../../helpers/stringHelper'

export default class ClienteConsumidorService extends CrudService {


    static getEndpoint() {
        return '/rest/clienteconsumidor';
    }


    static buildConsumer(id,usuario) {

        const clienteConsumidor = {id: id ,consumidor:{usuario:{}, type:'consumidor'}};
        usuario.telefone = buildPhone(usuario.telefone);
        clienteConsumidor.consumidor.usuario = usuario;
        return clienteConsumidor;

    }

}