import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { getPhoneMask } from '../helpers/stringHelper'
import { HANDLE_INPUT_CHANGE_CONSUMER, CLEAR_FORM_CONSUMER, UPDATE_STATE_CONSUMER, RECOMMEND_EDITION, SHOW_MODAL_CONSUMER, HIDE_MODAL_CONSUMER } from '../actions/consumerActionCreator';


const INITIAL_STATE = {
    id: null,
    recommendEdition: false,
    showModalState: false,
    consumidor: { usuario: { id: null, nome: '', email: '', telefone: '' }, type: 'consumidor' }
}


function updateConsumer(state, action, recommendEdition) {
    const newState = createInstance(state);
    newState.id = action.entity.id;
    newState.consumidor.usuario.id = action.entity.consumidor.usuario.id;
    newState.consumidor.usuario.nome = action.entity.consumidor.usuario.nome;
    newState.consumidor.usuario.email = action.entity.consumidor.usuario.email;
    newState.recommendEdition = recommendEdition;
    let telefoneStr = action.entity.consumidor.usuario.telefone.ddd.toString() + action.entity.consumidor.usuario.telefone.numero.toString();
    newState.consumidor.usuario.telefone = getPhoneMask(telefoneStr);
    return newState;
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_CONSUMER: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }

        case CLEAR_FORM_CONSUMER: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.consumidor.type = 'consumidor';
            newState.consumidor.usuario.telefone = '';
            return newState;
        }

        case SHOW_MODAL_CONSUMER: {
            const newState = createInstance(state);
            newState.showModalState = true;
            return newState;
        }

        case HIDE_MODAL_CONSUMER: {
            const newState = createInstance(state);
            newState.showModalState = false;
            return newState;
        }

        case UPDATE_STATE_CONSUMER: {
            return updateConsumer(state, action, false);
        }

        case RECOMMEND_EDITION: {
            return updateConsumer(state, action, true);
        }

        default:
            return state;
    }
}