import { HANDLE_INPUT_CHANGE_SALE, CLEAR_FORM_SALE, UPDATE_PRODUCT_LIST_SALE, UPDATE_PRODUCT_AUTO_COMPLETE_SALE,
UPDATE_CONSUMER_AUTO_COMPLETE_SALE, UPDATE_CONSUMER_LIST_SALE, CHANGE_RADIO_SALE, ADD_PRODUCT,
UPDATE_TYPE_SALE, UPDATE_APPOINTMENT_BOOKS, REDIRECT_SALE_PRODUCT } from '../actions/saleActionCreator'
import { getObjectNewState, createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'
import { Icon } from '../domain/Icon'
import Toast from '../helpers/Toast'
import { TYPE_SALE } from '../helpers/constants'

const INITIAL_STATE = {
    venda : { produtos: [] },
    folhaCaderneta: { id: null , caderneta: {id: null} , consumidor: { id: null , type:'CONSUMIDOR' , usuario: { id: null, nome: '' } } } ,
    produtoSelecionado: { id: null,  descricao: '' ,  quantidade: '' , codigo: '' , precoVenda : 0 },
    quantidade: '',
    produtosList: [],
    consumidores: [],
    typeSaleList: [],
    cadernetas: [],
    valorTotal: 0,
    currentPage: 1,
    type: TYPE_SALE.A_VISTA_ANONIMA
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
            newState.currentPage = 1;
            newState.type = TYPE_SALE.A_VISTA_ANONIMA;
            newState.folhaCaderneta.consumidor.type = 'CONSUMIDOR';
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
                newState.consumidores.push({id: consumer.id,userId: consumer.usuario.id, userName: consumer.usuario.nome});
            });

            return newState;
        }

        case UPDATE_CONSUMER_AUTO_COMPLETE_SALE : {
            const newState = createInstance(state);
            newState.folhaCaderneta.consumidor.id  = action.consumer.id;
            newState.folhaCaderneta.consumidor.usuario.id = action.consumer.userId;
            newState.folhaCaderneta.consumidor.usuario.nome =  action.consumer.userName;
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

            const total = newState.quantidade * newState.produtoSelecionado.precoVenda;

            newState.venda.produtos.push( { type: 'ITEM_VENDA',  movimentacaoProduto: { produto: { id: newState.produtoSelecionado.id,  descricao: newState.produtoSelecionado.descricao, 
                 codigo: newState.produtoSelecionado.codigo, precoVenda : newState.produtoSelecionado.precoVenda, precoTotal: total } , quantidade: newState.quantidade}});
            
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

        case UPDATE_APPOINTMENT_BOOKS: {
            const newState = createInstance(state); 
            newState.cadernetas = action.list;
            return newState;
        }

        case REDIRECT_SALE_PRODUCT: {
            const newState = createInstance(state);
            newState.folhaCaderneta.caderneta.id = action.id;
            newState.currentPage = 2;
            return newState;
        }

        default: {
            return state;
        }

    }
}

function setSaleRadio(newState,value) {
    
    newState.type = value;
    newState.typeSaleList.forEach(typeSale => {
        if(typeSale.type === value) {
            typeSale.checked = true;
        } else {
            typeSale.checked = false;
        }
            
    });
}