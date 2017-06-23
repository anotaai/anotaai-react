import { CLEAR_FORM_PRODUCT, HANDLE_INPUT_CHANGE_PRODUCT } from '../actions/productActionCreator';
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'

const INITIAL_STATE = {
    id: null,
    codigo: null,
    descricao: '',
    descircaoResumida: ''
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
        return newState;
    }
    default:
      return state;
  }
}