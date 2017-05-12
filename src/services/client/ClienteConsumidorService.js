import {URL_BACKEND} from '../../helpers/constants'
import { buildTelefone } from '../../helpers/stringHelper'

export default class ClienteConsumidorService {
  
    static findUsuarioByPhone(telefoneStr) {

        const telefone = buildTelefone(telefoneStr);

        return   fetch(`${URL_BACKEND}/rest/clienteconsumidor/findby/telefone`, {
            method: 'POST',
            body: JSON.stringify(telefone),
            headers: new Headers({
                'Content-type': 'application/json'})
           }) 
          .then(response => {
             return response.json();
          })
          .catch(error => {
             throw Error(error);
          })
    }
    
}