import {urlBackend } from '../helpers/constants'
import { buildPhone,getNumbers} from '../helpers/stringHelper'
import {  createInstance  } from '../helpers/jsonHelper'

export default class ClientService {
  
    static save(client,usuario,telefoneStr) {
       
        const newUserInstance = createInstance(usuario);
        const newClientInstance = createInstance(client);
        const newAddressInstance = createInstance(client.endereco);
        newUserInstance.telefone = buildPhone(telefoneStr);
        newClientInstance.cpf =   getNumbers(client.cpf);  
        newAddressInstance.cep = getNumbers(client.endereco.cep);  
        newClientInstance.usuario = newUserInstance;
        newClientInstance.address = newAddressInstance;
        newClientInstance.type = 'cliente';

      return  fetch(`${urlBackend}/rest/clientes/`,{
            method: 'POST',
            body: JSON.stringify(newClientInstance),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw Error(response);
        })
        .catch(error => {
           throw Error(error);
        });
    }

}