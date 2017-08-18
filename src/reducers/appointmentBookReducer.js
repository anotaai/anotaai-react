import { HANDLE_INPUT_CHANGE_APPOINTMENT, ADD_BOOK, CLEAR_FORM_APPOINTMENT_BOOK } from '../actions/appointmentBookActionCreator';
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper';


const INITIAL_STATE = {
    id: null,
    qtdDiasDuracaoFolha: '',
    diaBase: '',
    cadernetas: [],
}

export default function (state = INITIAL_STATE,action) {
     
    switch(action.type) {
       
        case HANDLE_INPUT_CHANGE_APPOINTMENT: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }

        case CLEAR_FORM_APPOINTMENT_BOOK: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            return newState;

        }

        case ADD_BOOK: {
            const newState = createInstance(state);
            newState.cadernetas.push({id: null, descricao:''});
            return newState;
        }

        default: return state;

    }
}

