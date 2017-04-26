import {urlBackend} from '../../helpers/constants'

export default class EnumService  {
    
     static load(enumName) {
       return fetch(`${urlBackend}/rest/enums/${enumName}`)
        .then(response => {
           if(response.ok){
             return response.json();
           }
           throw Error(response);
        }).catch(error => {
          throw Error(error);
        }); 
      
     }
}