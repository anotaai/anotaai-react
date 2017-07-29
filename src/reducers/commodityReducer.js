
import { HANDLE_INPUT_CHANGE_COMMODITY, UPDATE_PRODUCT_LIST_COMMODITY, 
UPDATE_PRODUCT_AUTO_COMPLETE_COMMODITY, UPDATE_TABLE_ITENS_COMMODITY, 
REMOVE_PRODUCT_COMMODITY, CLEAR_FORM_COMMODITY, UPDATE_COMMODITY, SHOW_MODAL_COMMODITY, HIDE_MODAL_COMMODITY  } from '../actions/commodityActionCreator'
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper';
import { pushProducts, setProduct, clearProduct } from './productReducer'
import { concatDot, dateToHtmlString } from '../helpers/stringHelper';
import { Icon } from '../domain/Icon';
import Toast from '../helpers/Toast';

const INITIAL_STATE = {
    id: null,
    codigo: '',
    showModalState: false,
    dataEntrada: dateToHtmlString(new Date()),
    itens: [],
    produtos: [],
    produtoSelecionado: { id: null, descricao: '' },
    precoCusto: 0,
    quantidade: ''
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_COMMODITY: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }

        case CLEAR_FORM_COMMODITY: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.precoCusto = 0;
            newState.dataEntrada = dateToHtmlString(new Date());
            return newState;
        } 

        case UPDATE_PRODUCT_LIST_COMMODITY: {
            return pushProducts(state,action);
        }

        case UPDATE_PRODUCT_AUTO_COMPLETE_COMMODITY: {
           return setProduct(state,action);
        } 

        case UPDATE_TABLE_ITENS_COMMODITY: {

            if (state.precoCusto === 0) {
               Toast.show('preco.custo.obrigatorio', Icon.WARNING);
               return state;
            }

            if (state.quantidade === 0) {
               Toast.show('quantidade.obrigatorio', Icon.WARNING);
               return state;
            }

            if (state.produtoSelecionado.id === null) {
                Toast.show('produto.obrigatorio', Icon.WARNING);
                return state;
            }

            const filtered = state.itens.findIndex((item) => item.movimentacaoProduto.produto.id === state.produtoSelecionado.id);

            if (filtered !== -1) {
                Toast.show('produto.ja.adicionado', Icon.WARNING);
                const newState = createInstance(state);
                clearProduct(newState);
                return newState;
            }

            const newState = createInstance(state);
            newState.itens.push({ id: null, type: 'entrada', movimentacaoProduto:{ id: null, produto: {id:  state.produtoSelecionado.id , descricao: state.produtoSelecionado.descricao} , quantidade: newState.quantidade }, precoCusto: concatDot(newState.precoCusto) });
            clearProduct(newState);

            return newState;
        } 

        case REMOVE_PRODUCT_COMMODITY: {
            const newState = createInstance(state);
            newState.itens.splice(newState.itens.findIndex((item) => item.movimentacaoProduto.produto.id === action.id), 1);
            return newState;
        }

        case SHOW_MODAL_COMMODITY: {
            const newState = createInstance(state);
            newState.showModalState = true;
            return newState;
        }

        case HIDE_MODAL_COMMODITY: {
            const newState = createInstance(state);
            newState.showModalState = false;
            return newState;
        }

        case UPDATE_COMMODITY: {
            const newState = createInstance(state);
            newState.id = action.entity.id;
            newState.dataEntrada = dateToHtmlString(new Date(action.entity.dataEntrada));

            action.entity.itens.forEach(json => {
                newState.itens.push({ id: json.id, type: 'entrada', movimentacaoProduto: { id: json.movimentacaoProduto.id, produto: {id: json.movimentacaoProduto.produto.id, descricao: json.movimentacaoProduto.produto.descricao} , quantidade: json.movimentacaoProduto.quantidade }, precoCusto: json.precoCusto });
            });

            return newState;
        }

        default: return state;

    }

}