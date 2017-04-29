import {urlBackend } from '../helpers/constants'
import { buildPhone,getNumbers} from '../helpers/stringHelper'

export default class ClientService {
  
    static save(cliente,usuario,telefoneStr) {
       
       
        usuario.telefone = buildPhone(telefoneStr);
        cliente.cpf =   getNumbers(cliente.cpf);  
        cliente.endereco.cep = getNumbers(cliente.endereco.cep);  

      return  fetch(`${urlBackend}/rest/clientes/`,{
            method: 'POST',
            body: JSON.stringify({type:'cliente', nomeComercial:cliente.nomeComercial,cpf:cliente.cpf,endereco:cliente.endereco,usuario: usuario}),
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