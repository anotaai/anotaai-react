import { HANDLE_INPUT_CHANGE_SALE, CLEAR_FORM_SALE, UPDATE_PRODUCT_LIST_SALE, UPDATE_PRODUCT_AUTO_COMPLETE_SALE,
UPDATE_CONSUMER_AUTO_COMPLETE_SALE, UPDATE_CONSUMER_LIST_SALE, CHANGE_RADIO_SALE, ADD_PRODUCT,
SHOW_MODAL_TO_SALE, HIDE_MODAL_TO_SALE,  UPDATE_TYPE_SALE, UPDATE_APPOINTMENT_BOOKS,
REDIRECT_SALE_PRODUCT } from '../actions/saleActionCreator'
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { concatDot } from '../helpers/stringHelper'
import { TYPE_SALE, ITEM_MOVIMENTACAO } from '../helpers/constants'

const INITIAL_STATE = {
    venda : { },
    folhaCadernetaVenda: { folhaCaderneta: {  id: null , caderneta: { id: null } , clienteConsumidor: { id: null ,  nomeConsumidor: ''  } } } ,
    produtoSelecionado: { id: null,  descricao: '' ,  quantidade: '' , codigo: '' , precoVenda : 0 },
    quantidade: '',
    produtosList: [],
    produtosSelecionados: [],
    consumidores: [],
    typeSaleList: [],
    cadernetas: [],
    pagamentos: [],
    valorTotal: 0,
    quantidadeTotal: 0,
    currentPage: 1,
    valorPagamento: 0,
    type: TYPE_SALE.A_VISTA_ANONIMA,
    showModalState: false
}


export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_SALE: {
            const newState = getObjectNewState(action.name, action.value, state);
            
            if(action.name === 'valorPagamento') {
              updatePayment(newState,action.value);
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
            newState.produtoSelecionado.id = action.product.id;
            newState.produtoSelecionado.descricao = action.product.descricao;
            newState.produtoSelecionado.codigo = action.product.codigo;
            newState.produtoSelecionado.precoVenda = action.product.precoVenda;
            newState.produtoSelecionado.descricaoResumida = action.product.descricaoResumida; 
            return newState;
        }

        case UPDATE_CONSUMER_LIST_SALE: {
            const newState = createInstance(state);
            action.list.forEach(clienteConsumidor => {
                newState.consumidores.push({id: clienteConsumidor.id, nomeConsumidor: clienteConsumidor.nomeConsumidor});
            });
            return newState;
        }

        case UPDATE_CONSUMER_AUTO_COMPLETE_SALE : {
            const newState = createInstance(state);
            newState.folhaCadernetaVenda = action.folhaCadernetaVenda;
            return newState;
        }

        case CHANGE_RADIO_SALE: {
            const newState = createInstance(state);
            setSaleRadio(newState,action.value);
            return newState;
        }

        case ADD_PRODUCT: {
            const newState = createInstance(state);
            action.itemVenda.venda = null;
            action.itemVenda.type = ITEM_MOVIMENTACAO.ITEM_VENDA;
            newState.produtosSelecionados.push(action.itemVenda);
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
            setSaleRadio(newState,'A_VISTA_ANONIMA');
            return newState;
        }

        case UPDATE_APPOINTMENT_BOOKS: {
            const newState = createInstance(state); 
            newState.cadernetas = action.list;
            return newState;
        }

        case REDIRECT_SALE_PRODUCT: {
            const newState = createInstance(state);
            newState.folhaCadernetaVenda.folhaCaderneta.caderneta = action.cadernetaVenda.caderneta;
            newState.venda = action.cadernetaVenda.venda;
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