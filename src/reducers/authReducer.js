import { AUTH_USER,  
         UNAUTH_USER} from '../actions/authActionCreator';

const INITIAL_STATE = { authenticated: false}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true ,  errorMsg: '' };
    case UNAUTH_USER:
      return { ...state, authenticated: false , errorMsg: action.msg};
    default:
      return state;
  }
}