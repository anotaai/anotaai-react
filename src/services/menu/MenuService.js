import { URL_BACKEND } from '../../helpers/constants'

export default class MenuService {

    static getMenu() {

        const authdata = 'Basic ' + localStorage.getItem('authdata');
        return fetch(`${URL_BACKEND}/rest/menu/principal`,{
            headers: new Headers({'Authorization': authdata})
        }).then(response => {
           return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }


}