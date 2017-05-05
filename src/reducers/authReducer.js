import { AUTH_USER,  
         UNAUTH_USER} from '../actions/authActionCreator';

const INITIAL_STATE = { loginState: null}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      return { ...state, loginState: action.loginState, errorMsg: '' };
    case UNAUTH_USER:
      return { ...state, loginState: null, errorMsg: action.msg};
    default:
      return state;
  }
}