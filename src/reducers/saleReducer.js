import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper';
import { concatDot } from '../helpers/stringHelper';
import { TYPE_SALE, ITEM_MOVIMENTACAO, LOCAL_SALE } from '../helpers/constants';
import {
    HANDLE_INPUT_CHANGE_SALE, 
    CLEAR_FORM_SALE, 
    UPDATE_PRODUCT_LIST_SALE, 
    UPDATE_PRODUCT_AUTO_COMPLETE_SALE,
    UPDATE_CONSUMER_AUTO_COMPLETE_SALE,
    REMOVE_CONSUMER,
    UPDATE_CONSUMER_LIST_SALE, 
    CHANGE_RADIO_SALE, 
    ADD_PRODUCT,
    SHOW_MODAL_TO_SALE, 
    HIDE_MODAL_TO_SALE, 
    UPDATE_TYPE_SALE, 
    UPDATE_APPOINTMENT_BOOKS,
    START_SALE,
    UPDATE_FOLHA_CADERNETA_VENDA
} from '../actions/saleActionCreator';

const INITIAL_STATE = {
    venda : {  produtos: [] },
    folhaCadernetaVenda: {
        type: LOCAL_SALE.FOLHA_CADERNETA,
        folhaCaderneta: {
            caderneta: null,
            clienteConsumidor: {
                nomeConsumidor: ''
            }
        },
        venda: null
    },
    cadernetaVenda: {
        type: LOCAL_SALE.CADERNETA
    },
    produtoSelecionado: { id: null,  descricao: '' ,  quantidade: '' , codigo: '' , precoVenda : 0 },
    quantidade: '',
    produtosList: [],
    consumidores: [],
    typeSaleList: [],
    caderneta: null,
    cadernetas: [],
    pagamentos: [],
    valorTotal: 0,
    quantidadeTotal: 0,
    currentPage: 1,
    valorPagamento: 0,
    type: TYPE_SALE.A_VISTA_ANONIMA,
    showModalState: false
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_SALE: {
            const newState = getObjectNewState(action.name, action.value, state);
            if (action.name === 'valorPagamento') {
              updatePayment(newState, action.value);
            }
            return newState;
        }

        case CLEAR_FORM_SALE: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.quantidade = '';
            newState.currentPage = 1;
            newState.valorPagamento = 0;
            newState.type = TYPE_SALE.A_VISTA_ANONIMA;
            return newState;
        }

        case UPDATE_PRODUCT_LIST_SALE: {
            const newState = createInstance(state);
            action.list.forEach(product => {
                newState.produtosList.push({id: product.id, descricao: product.descricao, descricaoResumida: product.descricaoResumida , codigo: product.codigo, precoVenda: product.precoVenda, quantidade: ''});
            });
            return newState;
        }

        case UPDATE_PRODUCT_AUTO_COMPLETE_SALE : {
            const newState = createInstance(state);
            newState.produtoSelecionado = action.product;
            return newState;
        }

        case UPDATE_CONSUMER_LIST_SALE: {
            const newState = createInstance(state);
            action.list.forEach(clienteConsumidor => {
                newState.consumidores.push(clienteConsumidor);
            });
            return newState;
        }

        case UPDATE_CONSUMER_AUTO_COMPLETE_SALE: {
            const newState = createInstance(state);
            newState.folhaCadernetaVenda.venda = newState.venda;
            newState.folhaCadernetaVenda.folhaCaderneta.clienteConsumidor = action.clienteConsumidor;
            newState.folhaCadernetaVenda.folhaCaderneta.caderneta = newState.caderneta;
            return newState;
        }

        case REMOVE_CONSUMER: {
            const newState = createInstance(state);
            let clienteConsumidor = clienteConsumidor = {
                nomeConsumidor: ''
            };
            newState.folhaCadernetaVenda.folhaCaderneta.clienteConsumidor = clienteConsumidor;
            return newState;
        }

        case CHANGE_RADIO_SALE: {
            const newState = createInstance(state);
            setSaleRadio(newState, action.value);
            return newState;
        }

        case ADD_PRODUCT: {
            const newState = createInstance(state);
            action.itemVenda.venda = null;
            action.itemVenda.type = ITEM_MOVIMENTACAO.ITEM_VENDA;
            newState.venda.produtos.push(action.itemVenda);
            newState.valorTotal += (newState.produtoSelecionado.precoVenda * newState.quantidade);
            newState.quantidadeTotal += Number(newState.quantidade);
            newState.produtoSelecionado.id = '';
            newState.produtoSelecionado.descricao = '';
            newState.quantidade = '';
            return newState;
        }

        case UPDATE_TYPE_SALE: {
            const newState = createInstance(state); 
            newState.typeSaleList = action.list;
            setSaleRadio(newState, TYPE_SALE.A_VISTA_ANONIMA);
            return newState;
        }

        case UPDATE_APPOINTMENT_BOOKS: {
            const newState = createInstance(state); 
            newState.cadernetas = action.list;
            return newState;
        }

        case START_SALE: {
            const newState = createInstance(state);
            newState.venda = action.venda;
            newState.venda.produtos = [];
            newState.caderneta = action.caderneta;
            newState.currentPage = 2;
            return newState;
        }

        case SHOW_MODAL_TO_SALE: {
            const newState = createInstance(state);
            newState.showModalState = true;
            return newState;
        }

        case HIDE_MODAL_TO_SALE: {
            const newState = createInstance(state);
            newState.showModalState = false;
            return newState;
        }

        case UPDATE_FOLHA_CADERNETA_VENDA: {
            const newState = createInstance(state);
            newState.folhaCadernetaVenda = action.folhaCadernetaVenda;
            newState.folhaCadernetaVenda.type = LOCAL_SALE.FOLHA_CADERNETA;
            return newState;
        }

        default: {
            return state;
        }

    }
}

function updatePayment(newState, value) {
    newState.pagamentos = [];
    newState.pagamentos.push({id: null , pagamento: { id: null , type: 'AVISTA', pagamento: { id: null, valorPagamento:concatDot(value)} } });
}

function setSaleRadio(newState, value) {
    newState.type = value;
    newState.typeSaleList.forEach(typeSale => {
        if (typeSale.type === value) {
            typeSale.checked = true;
        } else {
            typeSale.checked = false;
        }
    });
}