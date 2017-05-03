export const AUTH_USER = 'auth_user', UNAUTH_USER = 'unauth_user';


export function authUser(){
    return {type:AUTH_USER};
}

export function unauthUser(msg=''){
    return {type:UNAUTH_USER,msg}    
}