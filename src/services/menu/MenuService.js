import { URL_BACKEND } from '../../helpers/constants'

export default class MenuService {

    static getMenu() {

        const authdata = 'Basic ' + localStorage.getItem('authdata');
        return fetch(`${URL_BACKEND}/rest/menu/principal`,{
            headers: new Headers({'Authorization': authdata})
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw Error(response);
        }).catch(error => {
            throw Error(error);
        });
    }


}