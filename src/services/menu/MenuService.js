import UserService from '../UserService'
import Toast from '../../helpers/Toast'
import { updateMenu } from '../../actions/menuActionCreator'

export default class MenuService {

    static getMenu() {

        return dispatch => {

            fetch(`${process.env.REACT_APP_URL_BACKEND}/rest/menu/principal`).then(response => {
                return response.json();
            }).then(json => {
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