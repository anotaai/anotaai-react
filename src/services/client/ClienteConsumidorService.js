import {urlBackend} from '../../helpers/constants'

class ClienteConsumidorService {
  
    static findUsuarioByPhone(telefone) {

        return 
         fetch(`${urlBackend}/rest/clienteconsumidor/findby/telefone`,{
            method: 'POST',
            body: JSON.stringify({telefone}),
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