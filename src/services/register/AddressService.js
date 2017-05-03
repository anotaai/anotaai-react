import {URL_BACKEND} from '../../helpers/constants'

export default class AddressService  {
        
        static findCep(cep) {
            return fetch(`${URL_BACKEND}/rest/enderecos/findcep/${cep}`)
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