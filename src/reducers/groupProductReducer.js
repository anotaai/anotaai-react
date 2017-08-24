import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { HANDLE_INPUT_CHANGE_GROUP_PRODUCT, CLEAR_FORM_GROUP_PRODUCT, 
    UPDATE_STATE_GROUP_PRODUCT, SHOW_MODAL, HIDE_MODAL, UPDATE_SECTOR_LIST,
    UPDATE_GROUP_PRODUCT_BY_SECTOR } from '../actions/groupProductActionCreator';


const INITIAL_STATE = {
    id: null,
    nome: '',
    descricao: '',
    showModalState: false,
    setor: { id: '', nome: '', descricao: '' },
    setores: []
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
            const newState = createInstance(state);
            newState.id = action.entity.id;
            newState.nome = action.entity.nome;
            newState.descricao = action.entity.descricao;
            newState.setor.id = action.entity.setor.id;
            newState.setor.nome = action.entity.setor.nome;
            newState.setor.descricao = action.entity.setor.descricao;
            return newState;
        }

        case SHOW_MODAL: {
            const newState = createInstance(state);
            newState.showModalState = true;
            return newState;
        }

        case HIDE_MODAL: {
            const newState = createInstance(state);
            newState.showModalState = false;
            return newState;
        }

        case UPDATE_SECTOR_LIST: {
            const newState = createInstance(state);
            newState.setores = action.list;
            return newState;
        }

        case UPDATE_GROUP_PRODUCT_BY_SECTOR: {
            const newState = createInstance(state);
            newState.setor = {id: action.id,nome:action.nome}
            return newState;
        }

        default:
            return state;
    }
}