
export default class MenuService {

    static getMenu() {

         
        return fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/menu/principal`).then(response => {
           return response.json();
        }).catch(error => {
            throw Error(error);
        });
    }


}