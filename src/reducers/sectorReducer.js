import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { HANDLE_INPUT_CHANGE_SECTOR, CLEAR_FORM_SECTOR, UPDATE_STATE_SECTOR } from '../actions/sectorActionCreator';


const INITIAL_STATE = {
    id: '',
    nome: '',
    descricao: ''
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_SECTOR: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }

        case CLEAR_FORM_SECTOR: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            return newState;
        }

        case UPDATE_STATE_SECTOR: {
            const newState = createInstance(action.entity);
            return newState;
        }

        default:
            return state;
    }
}