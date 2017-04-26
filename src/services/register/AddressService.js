import {urlBackend} from '../../helpers/constants'

export default class AddressService  {
        
        static findCep(cep) {
            return fetch(`${urlBackend}/rest/enderecos/findcep/${cep}`)
                  .then(response => {
                        if(response.ok) {
                         return  response.json();
                        }
                         throw Error(response);
                    } )
                  .catch(error => {
                   throw Error(error);
                  }); 
        }
         
}