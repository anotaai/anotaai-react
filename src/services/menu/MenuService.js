import { URL_BACKEND } from '../../helpers/constants'

export default class MenuService {

    static getMenu() {

         
        return fetch(`${URL_BACKEND}/rest/menu/principal`).then(response => {
           return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }


}