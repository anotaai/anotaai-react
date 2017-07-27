import { buildPhone,getNumbers} from '../helpers/stringHelper'
import {  createInstance  } from '../helpers/jsonHelper'
import AsyncService from '../services/AsyncService'


export default class ClientService {

    static getEndpoint() {
        return '/clientes';
    }
  
    static save(client,usuario,telefoneStr,component) {
       
        const newUserInstance = createInstance(usuario);
        const newClientInstance = createInstance(client);
        const newAddressInstance = createInstance(client.endereco);
        newUserInstance.telefone = buildPhone(telefoneStr);
        newClientInstance.cpf =   getNumbers(client.cpf);  
        newAddressInstance.cep = getNumbers(client.endereco.cep);  
        newClientInstance.usuario = newUserInstance;
        newClientInstance.endereco = newAddressInstance;

       return AsyncService.fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/`,[component], {
            method: 'POST',
            body: JSON.stringify(newClientInstance),
            headers: { 'Content-type': 'application/json' }
       });
    }

}