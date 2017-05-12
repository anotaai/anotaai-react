import {URL_BACKEND} from '../../helpers/constants'

export default class EnumService  {
    
     static load(enumName) {
       return fetch(`${URL_BACKEND}/rest/enums/${enumName}`)
        .then(response => {
           return response.json();
        }).catch(error => {
          throw Error(error);
        }); 
      
     }
}