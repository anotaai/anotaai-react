import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { getPhoneMask } from '../helpers/stringHelper'
import { HANDLE_INPUT_CHANGE_CONSUMER, CLEAR_FORM_CONSUMER, UPDATE_STATE_CONSUMER, RECOMMEND_EDITION, SHOW_MODAL_CONSUMER, HIDE_MODAL_CONSUMER } from '../actions/consumerActionCreator';


const INITIAL_STATE = {
    id: null,
    recommendEdition: false,
    showModalState: false,
    clienteConsumidor: { consumidor: { usuario: { id: null, telefone: '' }, type: 'CONSUMIDOR' } }
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
            newState.clienteConsumidor.consumidor.type = 'CONSUMIDOR';
            newState.clienteConsumidor.consumidor.usuario.telefone = '';
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

function updateConsumer(state, action, recommendEdition) {
    const newState = createInstance(state);
    newState.id = action.entity.id;
    newState.clienteConsumidor.consumidor.usuario.id = action.entity.clienteConsumidor.consumidor.usuario.id;
    newState.clienteConsumidor.nomeConsumidor = action.entity.clienteConsumidor.nomeconsumidor;
    newState.recommendEdition = recommendEdition;
    let telefoneStr = action.entity.clienteConsumidor.consumidor.usuario.telefone.ddd.toString() + action.entity.clienteConsumidor.consumidor.usuario.telefone.numero.toString();
    newState.clienteConsumidor.consumidor.usuario.telefone = getPhoneMask(telefoneStr);
    return newState;
}