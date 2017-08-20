import { HANDLE_INPUT_CHANGE_APPOINTMENT_BOOK, ADD_BOOK, CLEAR_FORM_APPOINTMENT_BOOK,
REMOVE_BOOK, SHOW_MODAL_APPOINTMENT_BOOK, HIDE_MODAL_APPOINTMENT_BOOK,
UPDATE_APPOINTMENT_BOOK } from '../actions/appointmentBookActionCreator';
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper';


const INITIAL_STATE = {
    id: null,
    qtdDiasDuracaoFolha: '',
    diaBase: '',
    cadernetas: [{id: null , descricao: ''}],
    showModalState: false
}

export default function (state = INITIAL_STATE,action) {
     
    switch(action.type) {
       
        case HANDLE_INPUT_CHANGE_APPOINTMENT_BOOK: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }

        case CLEAR_FORM_APPOINTMENT_BOOK: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.cadernetas = [{id: null , descricao: ''}];
            newState.qtdDiasDuracaoFolha = '';
            newState.diaBase = '';
            return newState;
        }

        case ADD_BOOK: {
            const newState = createInstance(state);
            newState.cadernetas.push({id: null , descricao: ''});
            return newState;
        }

         case REMOVE_BOOK: {
            const newState = createInstance(state);
            newState.cadernetas.splice(action.position,1);
            return newState;
        }

        case SHOW_MODAL_APPOINTMENT_BOOK: {
            const newState = createInstance(state);
            newState.showModalState = true;
            return newState;
        }

        case HIDE_MODAL_APPOINTMENT_BOOK: {
            const newState = createInstance(state);
            newState.showModalState = false;
            return newState;
        }

        case UPDATE_APPOINTMENT_BOOK: {
            const newState = createInstance(state);
            newState.id = action.entity.id;
            newState.qtdDiasDuracaoFolha = action.entity.qtdDiasDuracaoFolha;
            newState.diaBase = action.entity.diaBase;
            newState.cadernetas = [];
            
            action.entity.cadernetas.forEach(json => {
                newState.cadernetas.push({ id: json.id, descricao: json.descricao });
            });

            return newState;
        }

        default: return state;

    }
}

