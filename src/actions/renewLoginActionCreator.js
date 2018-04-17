export const LOGIN = 'login', EXIT = 'exit';

export function login() {
    return { type: 'SHOW_MODAL' }
}

export function exit() {
    return { type: 'HIDE_MODAL' }
}