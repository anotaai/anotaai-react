import { CLEAR_FORM_PRODUCT, HANDLE_INPUT_CHANGE_PRODUCT, UPDATE_UNIT, UPDATE_DAY_OF_WEEK,UPDATE_AVAILABLE_DAYS } from '../actions/productActionCreator';
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'

const INITIAL_STATE = {
    id: null,
    codigo: '',
    descricao: '',
    descricaoResumida: '',
    unidadeMedida: { type: '' , descricao: ''},
    precoVenda: 0,
    unidadeList: [],
    diasDisponibilidades: [],
    diasSemana: []
}


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case HANDLE_INPUT_CHANGE_PRODUCT: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }

        case CLEAR_FORM_PRODUCT: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.precoVenda = 0;
            return newState;
        }

         case UPDATE_UNIT: {
            const newState = createInstance(state);
            newState.unidadeList = action.json;
            return newState;
        }

         case UPDATE_DAY_OF_WEEK: {
             const newState = createInstance(state);
             action.json.forEach(day => {
                 newState.diasSemana.push(day.descricao);
             });
             
             newState.diasDisponibilidades = newState.diasSemana;
             
             return newState;
        }
        
        case UPDATE_AVAILABLE_DAYS: {
            const newState = createInstance(state);
            newState.diasDisponibilidades = action.chips;
            return newState;
        }

        default:
            return state;
    }
}