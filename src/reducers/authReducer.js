import { AUTH_USER, UNAUTH_USER } from '../actions/authActionCreator';
import { URL } from '../helpers/constants'

const INITIAL_STATE = { loginState: null , baseUrl: '/' }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { loginState: action.loginState , baseUrl: URL.DASHBOARD };
    case UNAUTH_USER:
      return { loginState: null , baseUrl: '/' };
    default:
      return state;
  }
}