import UserService from '../UserService'
import { updateMenu } from '../../actions/menuActionCreator'

export default class MenuService {

    static getEndpoint() {
        return '/menu';
    }

    static getMenu() {

        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}${this.getEndpoint()}/principal`).then(json => {
                if(Array.isArray(json)) {
                    dispatch(updateMenu(json));
                }
            }).catch(error => {
                console.log('ERRO [services\\menu\\MenuService.js 20]');
                dispatch(UserService.dispatchLogout());
            });
        }


    }


}