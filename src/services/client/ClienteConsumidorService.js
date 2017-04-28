import {urlBackend} from '../../helpers/constants'
import { buildTelefone } from '../../helpers/stringHelper'

export default class ClienteConsumidorService {
  
    static findUsuarioByPhone(telefoneStr) {

        const telefone = buildTelefone(telefoneStr);

        return   fetch(`${urlBackend}/rest/clienteconsumidor/findby/telefone`,{
            method: 'POST',
            body: JSON.stringify({ddd:telefone.ddd,ddi:telefone.ddi,numero:telefone.numero}),
            headers: new Headers({
                'Content-type': 'application/json'})
           }) 
          .then(response => {
              if(response.ok) {
                 return response.json();  
              }
              throw Error(response);
          })
          .catch(error => {
             throw Error(error);
          })
    }
    
}