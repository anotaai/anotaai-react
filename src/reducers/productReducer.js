import {
    CLEAR_FORM_PRODUCT, HANDLE_INPUT_CHANGE_PRODUCT, UPDATE_UNIT, UPDATE_DAY_OF_WEEK, UPDATE_AVAILABLE_DAYS, UPDATE_PRODUCT, NEW_DEFAULT_VALUES,
    UPDATE_PRODUCT_LIST, UPDATE_PRODUCT_AUTO_COMPLETE, UPDATE_TABLE_ITENS, REMOVE_PRODUCT
} from '../actions/productActionCreator';
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper';
import { concatZeros } from '../helpers/stringHelper';
import { Icon } from '../domain/Icon';
import Toast from '../helpers/Toast';

const INITIAL_STATE = {
    id: null,
    codigo: '',
    descricao: '',
    descricaoResumida: '',
    unidadeMedida: { type: '', descricao: '' },
    produtoSelecionado: { id: null, descricao: '' },
    precoVenda: 0,
    codigoGerado: false,
    ehInsumo: false,
    diasDisponibilidade: [],
    itensReceita: [],
    produtos: [],
    diasSemana: [],
    unidadeList: [],
    blockCode: false,
    qtdProduct: ''
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case HANDLE_INPUT_CHANGE_PRODUCT: {
            const newState = getObjectNewState(action.name, action.value, state);

            if (action.name === 'codigoGerado' && action.value === true) {
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
            newState.qtdProduct = '';
            newState.itensReceita = [];
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
                newState.produtos.push({ id: product.id, descricao: product.descricao });
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
            newState.precoVenda =  concatZeros(action.entity.precoVenda) 
            newState.codigoGerado = action.entity.codigoGerado;

            action.entity.diasDisponibilidade.forEach(json => {
                newState.diasDisponibilidade.push(json.dia.descricao);
            });

            newState.itensReceita = [];
            
            action.entity.itensReceita.forEach(json => {
                newState.itensReceita.push({ id: json.id , ingrediente: { id: json.ingrediente.id, descricao: json.ingrediente.descricao }, quantidade: json.quantidade });
            });
            

            return newState;
        }

        case UPDATE_TABLE_ITENS: {

            if (state.qtdProduct === '') {
                Toast.show('quantidade.obrigatoria', Icon.WARNING);
                return state;
            }

            if (state.produtoSelecionado.id === null) {
                Toast.show('produto.obrigatorio', Icon.WARNING);
                return state;
            }

            const filtered = state.itensReceita.findIndex((item) => item.ingrediente.id === state.produtoSelecionado.id);

            if (filtered !== -1) {
                Toast.show('ja.adicionado', Icon.WARNING);
                return state;
            }

            const newState = createInstance(state);
            newState.itensReceita.push({ id: null , ingrediente: { id: newState.produtoSelecionado.id, descricao: newState.produtoSelecionado.descricao }, quantidade: newState.qtdProduct });
            newState.produtoSelecionado.id = null;
            newState.produtoSelecionado.descricao = '';
            newState.qtdProduct = '';

            return newState;
        }

        case REMOVE_PRODUCT: {
            const newState = createInstance(state);
            newState.itensReceita.splice(newState.itensReceita.findIndex((item) => item.ingrediente.id === action.id), 1);
            return newState;
        }

        default:
            return state;
    }
}