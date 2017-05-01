import {authUser} from '../../actions/authActionCreator'
import {browserHistory} from 'react-router'
import {urlHome} from '../../helpers/constants'

export default class LoginService {

    static login() {
        return function (dispatch) {
            dispatch(authUser());
            browserHistory.push(urlHome);
        }
    }

}