export const AUTH_USER = 'auth_user', UNAUTH_USER = 'unauth_user';


export function authUser(loginState){
    return {type:AUTH_USER,loginState};
}

export function unauthUser(msg=''){
    return {type:UNAUTH_USER,msg}    
}