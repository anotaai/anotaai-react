import {URL_BACKEND} from '../../helpers/constants'

export default class MenuService  {

    static getMenu() {

        return fetch(`${URL_BACKEND}/rest/menu`).then(response => {
        
           if(response.ok) {
               return response.json();
           }

           throw Error(response);

        }).catch(error => {
          throw Error(error);
        });  
    }


}