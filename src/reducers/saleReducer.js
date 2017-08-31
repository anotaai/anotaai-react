import { HANDLE_INPUT_CHANGE_SALE, CLEAR_FORM_SALE, UPDATE_PRODUCT_LIST_SALE, UPDATE_PRODUCT_AUTO_COMPLETE_SALE,
UPDATE_CONSUMER_AUTO_COMPLETE_SALE, UPDATE_CONSUMER_LIST_SALE, CHANGE_RADIO_SALE, ADD_PRODUCT,
UPDATE_TYPE_SALE } from '../actions/saleActionCreator'
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { Icon } from '../domain/Icon'
import Toast from '../helpers/Toast'

const INITIAL_STATE = {
    venda : {
        produtos: []
    },
    produtoSelecionado: { id: null,  descricao: '' ,  quantidade: '' , codigo: '' , precoVenda : 0 },
    quantidade: '',
    consumidor: { id: null, nome: '' },
    produtosList: [],
    consumidores: [],
    typeSaleList: [],
    valorTotal: 0,
    type: ''
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_SALE: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }

        case CLEAR_FORM_SALE: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.quantidade = '';
            return newState;
        }

        case UPDATE_PRODUCT_LIST_SALE: {
            
            const newState = createInstance(state);
            
            action.list.forEach(product => {
                newState.produtosList.push({id: product.id, descricao: product.descricao, codigo: product.codigo, precoVenda: product.precoVenda, quantidade: ''});
            });

            return newState;
        }

        case UPDATE_PRODUCT_AUTO_COMPLETE_SALE : {
            const newState = createInstance(state);
            newState.produtoSelecionado.id = action.product.id;
            newState.produtoSelecionado.descricao = action.product.descricao;
            newState.produtoSelecionado.codigo = action.product.codigo;
            newState.produtoSelecionado.precoVenda = action.product.precoVenda;
            return newState;
        }

        case UPDATE_CONSUMER_LIST_SALE: {
            
            const newState = createInstance(state);
            
            action.list.forEach(consumer => {
                newState.consumidores.push({id: consumer.usuario.id, nome: consumer.usuario.nome});
            });

            return newState;
        }

        case UPDATE_CONSUMER_AUTO_COMPLETE_SALE : {
            const newState = createInstance(state);
            newState.consumidor.id = action.consumer.id;
            newState.consumidor.nome = action.consumer.nome;
            return newState;
        }

        case CHANGE_RADIO_SALE: {
            const newState = createInstance(state);
            setSaleRadio(newState,action.value);
            return newState;
        }

        case ADD_PRODUCT: {
            const newState = createInstance(state);
            
            if(newState.quantidade === '' || newState.quantidade === 0) {
                Toast.show('quantidade.required', Icon.WARNING);
                return state;
            }

            if(newState.produtoSelecionado.id === null) {
                Toast.show('produto.required', Icon.WARNING);
                return state;
            }

            newState.venda.produtos.push( { type: 'venda',  movimentacaoProduto: { produto: { id: newState.produtoSelecionado.id,  descricao: newState.produtoSelecionado.descricao, 
                quantidade: newState.quantidade, codigo: newState.produtoSelecionado.codigo, precoVenda : newState.produtoSelecionado.precoVenda } } } );
            
            newState.valorTotal += (newState.produtoSelecionado.precoVenda * newState.quantidade );
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

        default: {
            return state;
        }

    }
}

function setSaleRadio(newState,value) {
    
    newState.typeSaleList.forEach(typeSale => {
        if(typeSale.type === value) {
            typeSale.checked = true;
        } else {
            typeSale.checked = false;
        }
            
    });
}