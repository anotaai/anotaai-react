import { HANDLE_INPUT_CHANGE_COMPRADOR, CLEAR_FORM_COMPRADOR, HANDLE_PHONE_CHANGE_COMPRADOR, CLEAR_PASSWORD_COMPRADOR } from '../actions/compradorActionCreator'
import { createInstance, getObjectNewState, clearAllPropertiesObject } from '../helpers/jsonHelper'

const INITIAL_STATE = {
    usuario: { nome: '', email: '', senha: '' },
    confirmarSenha: '',
    telefone: '',
    telefoneRetornado: ''
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_COMPRADOR: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }
        case CLEAR_FORM_COMPRADOR: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            return newState;
        }
        case CLEAR_PASSWORD_COMPRADOR: {
            const newState = createInstance(state);
            newState.usuario.senha = '';
            newState.confirmarSenha = '';
            return newState;
        }
        case HANDLE_PHONE_CHANGE_COMPRADOR: {
            const newState = createInstance(state);
            newState.usuario.nome = action.entity.nome;
            newState.usuario.email = action.entity.email;
            newState.telefoneRetornado = 'S';
            return newState;
        }

        default:
            return state;

    }
}