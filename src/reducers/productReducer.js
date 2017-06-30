import { CLEAR_FORM_PRODUCT, HANDLE_INPUT_CHANGE_PRODUCT, UPDATE_UNIT, UPDATE_DAY_OF_WEEK,UPDATE_AVAILABLE_DAYS, UPDATE_PRODUCT, NEW_DEFAULT_VALUES,
UPDATE_PRODUCT_LIST, UPDATE_PRODUCT_AUTO_COMPLETE, UPDATE_TABLE_ITENS } from '../actions/productActionCreator';
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'

const INITIAL_STATE = {
    id: null,
    codigo: '',
    descricao: '',
    descricaoResumida: '',
    unidadeMedida: { type: '' , descricao: ''},
    produtoSelecionado: { id: null,  descricao: '' },
    precoVenda: 0,
    codigoGerado: false,
    ehInsumo: false,
    blockCode: false,
    unidadeList: [],
    diasDisponibilidade: [],
    diasSemana: [],
    itensReceita: [],
    produtos: []
}


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case HANDLE_INPUT_CHANGE_PRODUCT: {
            const newState = getObjectNewState(action.name, action.value, state);
            
            if(action.name === 'codigoGerado' && action.value === true){
               newState.blockCode = true;
               newState.codigo = '';
            } else {
               newState.blockCode = false;
            }

            return newState;
        }

        case CLEAR_FORM_PRODUCT: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.precoVenda = 0;
            newState.codigo = '';
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
             return newState;
        }

        case NEW_DEFAULT_VALUES: {
            const newState = createInstance(state);
            newState.diasDisponibilidade = newState.diasSemana; 
            return newState;
        }
        
        case UPDATE_AVAILABLE_DAYS: {
            const newState = createInstance(state);
            newState.diasDisponibilidade = action.chips;
            return newState;
        }

         case UPDATE_PRODUCT_LIST: {
            const newState = createInstance(state);
            newState.produtos = [];
          
            action.list.forEach(product => {
                 newState.produtos.push({id: product.id  , descricao: product.descricao });
            });
            return newState;
        }


        case UPDATE_PRODUCT_AUTO_COMPLETE: {
           const newState = createInstance(state);
           newState.produtoSelecionado.id = action.product.id;
           newState.produtoSelecionado.descricao = action.product.descricao;
           return newState;
        }

         case UPDATE_PRODUCT: {
           
            const newState = createInstance(state);
            newState.id = action.entity.id;
            newState.codigo = action.entity.codigo;
            newState.descricao = action.entity.descricao;
            newState.descricaoResumida = action.entity.descricaoResumida;
            newState.unidadeMedida = action.entity.unidadeMedida;
            newState.precoVenda = action.entity.precoVenda;
            newState.codigoGerado = action.entity.codigoGerado;
            
            action.entity.diasDisponibilidade.forEach(json => {
                 newState.diasDisponibilidade.push(json.dia.descricao);
            });

            return newState;
        }

        case UPDATE_TABLE_ITENS: {

            const newState = createInstance(state);
           
            return newState;
        }

        default:
            return state;
    }
}