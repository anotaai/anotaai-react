import {URL_BACKEND} from '../../helpers/constants'

export default class EnumService  {
    
     static load(enumName) {
       return fetch(`${URL_BACKEND}/rest/enums/${enumName}`)
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