import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { getPhoneMask } from '../helpers/stringHelper'
import { HANDLE_INPUT_CHANGE_CONSUMER, CLEAR_FORM_CONSUMER, UPDATE_STATE_CONSUMER } from '../actions/consumerActionCreator';


const INITIAL_STATE = {
    id: null,
    consumidor: { usuario: {id: null, nome:'', email: '',telefone: ''}, type: 'consumidor' }
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

        case UPDATE_STATE_CONSUMER: {
            const newState = createInstance(state);
            newState.id  = action.entity.id;
            newState.consumidor  = action.entity.consumidor;
            let telefoneStr = action.entity.consumidor.usuario.telefone.ddd.toString() + action.entity.consumidor.usuario.telefone.numero.toString();
            newState.consumidor.usuario.telefone = getPhoneMask(telefoneStr);
            return newState
        }

        default:
            return state;
    }
}