import UserService from '../UserService'
import Toast from '../../helpers/Toast'
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
                Toast.defaultError();
                dispatch(UserService.dispatchLogout());
            });
        }


    }


}