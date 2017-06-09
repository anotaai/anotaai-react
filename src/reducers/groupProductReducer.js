import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { HANDLE_INPUT_CHANGE_GROUP_PRODUCT, CLEAR_FORM_GROUP_PRODUCT, UPDATE_STATE_GROUP_PRODUCT } from '../actions/groupProductActionCreator';
 
const INITIAL_STATE = {
    id: '',
    nome: '',
    descricao: '',
    setor: {}
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_GROUP_PRODUCT: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }

        case CLEAR_FORM_GROUP_PRODUCT: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            return newState;
        }

        case UPDATE_STATE_GROUP_PRODUCT: {
            const newState = createInstance(action.entity);
            return newState;
        }

        default:
            return state;
    }
}