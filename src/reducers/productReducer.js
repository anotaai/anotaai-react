import {
    CLEAR_FORM_PRODUCT, HANDLE_INPUT_CHANGE_PRODUCT, UPDATE_UNIT, UPDATE_DAY_OF_WEEK, UPDATE_AVAILABLE_DAYS, UPDATE_PRODUCT, NEW_DEFAULT_VALUES,
    UPDATE_PRODUCT_LIST, UPDATE_PRODUCT_AUTO_COMPLETE, UPDATE_TABLE_ITENS, REMOVE_PRODUCT, HIDE_MODAL_PRODUCT, SHOW_MODAL_PRODUCT,
    TOGGLE_GROUP_PRODUCT_ACCORDION, TOGGLE_COMMODITY_ACCORDION, UPDATE_GROUP_PRODUCT_LIST, UPDATE_GROUP_PRODUCT_AUTO_COMPLETE, REMOVE_GROUP_PRODUCT,
    UPDATE_GROUP_PRODUCT_TABLE_ITENS, CHANGE_GROUP_PRODUCT_RADIO
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
    grupoProduto: { id: '', nome: '' },
    precoVenda: 0,
    codigoGerado: false,
    ehInsumo: false,
    grupos: [],
    diasDisponibilidade: [],
    itensReceita: [],
    produtos: [],
    gruposTableList: [],
    diasSemana: [],
    unidadeList: [],
    blockCode: false,
    quantidade: '',
    showModalState: false,
    groupProductAccordionState: '1',
    commodityAccordionState: '1',
    produtoSelecionado: { id: null, descricao: '' },
    grupoProdutoSelecionado: { id: null, nome: '' }
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

        case TOGGLE_GROUP_PRODUCT_ACCORDION: {
            const newState = createInstance(state);

            if (newState.groupProductAccordionState === '1') {
                newState.groupProductAccordionState = null;
            } else {
                newState.groupProductAccordionState = '1';
            }

            return newState;
        }

        case TOGGLE_COMMODITY_ACCORDION: {

            const newState = createInstance(state);

            if (newState.commodityAccordionState === '1') {
                newState.commodityAccordionState = null;
            } else {
                newState.commodityAccordionState = '1';
            }

            return newState;
        }

        case CLEAR_FORM_PRODUCT: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.precoVenda = 0;
            newState.codigo = '';
            newState.quantidade = '';
            newState.groupProductAccordionState = '1';
            newState.commodityAccordionState = '1';
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
            return pushProducts(state, action);
        }

        case UPDATE_GROUP_PRODUCT_LIST: {

            const newState = createInstance(state);
            newState.gruposTableList = [];

            action.list.forEach(groupProduct => {
                newState.gruposTableList.push({ id: groupProduct.id, nome: groupProduct.nome });
            });

            return newState;
        }

        case UPDATE_PRODUCT_AUTO_COMPLETE: {
            return setProduct(state, action);
        }

        case UPDATE_GROUP_PRODUCT_AUTO_COMPLETE: {
            const newState = createInstance(state);
            newState.grupoProdutoSelecionado.id = action.groupProduct.id;
            newState.grupoProdutoSelecionado.nome = action.groupProduct.nome;
            return newState;
        }

        case UPDATE_PRODUCT: {
            const newState = createInstance(state);
            newState.id = action.entity.id;
            newState.codigo = action.entity.codigo;
            newState.descricao = action.entity.descricao;
            newState.descricaoResumida = action.entity.descricaoResumida;
            newState.unidadeMedida = action.entity.unidadeMedida;
            newState.precoVenda = concatZeros(action.entity.precoVenda)
            newState.codigoGerado = action.entity.codigoGerado;

            action.entity.diasDisponibilidade.forEach(json => {
                newState.diasDisponibilidade.push(json.dia.descricao);
            });

            action.entity.itensReceita.forEach(json => {
                newState.itensReceita.push({ id: json.id, ingrediente: { id: json.ingrediente.id, descricao: json.ingrediente.descricao }, quantidade: json.quantidade });
            });

            action.entity.grupos.forEach(json => {
                newState.grupos.push({ id: json.id, grupoProduto: { id: json.grupoProduto.id, nome: json.grupoProduto.nome }, ehPrincipal: json.ehPrincipal });
            });

            return newState;
        }

        case UPDATE_GROUP_PRODUCT_TABLE_ITENS: {

            if(state.grupoProdutoSelecionado.id === null) {
                Toast.show('grupo.required', Icon.WARNING);
                return state;
            }
            
            const filtered = state.grupos.findIndex((item) => item.grupoProduto.id === state.grupoProdutoSelecionado.id);

            if (filtered !== -1) {
                Toast.show('grupo.ja.adicionado', Icon.WARNING);
                const newState = createInstance(state);
                newState.grupoProdutoSelecionado.id = null;
                newState.grupoProdutoSelecionado.nome = '';
                return newState;
            }

            const newState = createInstance(state);
            
            let ehPrincipal = false;
            if(newState.grupos.length === 0) {
                ehPrincipal = true;
            } 

            newState.grupos.push( { id: null, grupoProduto: { id: state.grupoProdutoSelecionado.id, nome: state.grupoProdutoSelecionado.nome } , ehPrincipal: ehPrincipal});
            newState.grupoProdutoSelecionado.id = null;
            newState.grupoProdutoSelecionado.nome = '';

            return newState;
        }

        case UPDATE_TABLE_ITENS: {

            if (state.quantidade === '') {
                Toast.show('quantidade.obrigatoria', Icon.WARNING);
                return state;
            }

            if (state.produtoSelecionado.id === null) {
                Toast.show('produto.obrigatorio', Icon.WARNING);
                return state;
            }

            const filtered = state.itensReceita.findIndex((item) => item.ingrediente.id === state.produtoSelecionado.id);

            if (filtered !== -1) {
                Toast.show('produto.ja.adicionado', Icon.WARNING);
                const newState = createInstance(state);
                clearProduct(newState);
                return newState;
            }

            const newState = createInstance(state);
            newState.itensReceita.push({ id: null, ingrediente: { id: newState.produtoSelecionado.id, descricao: newState.produtoSelecionado.descricao }, quantidade: newState.quantidade });
            clearProduct(newState);

            return newState;
        }

        case REMOVE_PRODUCT: {
            const newState = createInstance(state);
            newState.itensReceita.splice(newState.itensReceita.findIndex((item) => item.ingrediente.id === action.id), 1);
            return newState;
        }

        case REMOVE_GROUP_PRODUCT: {
            const newState = createInstance(state);
            newState.grupos.splice(newState.grupos.findIndex((item) => item.grupoProduto.id === action.id), 1);
            return newState;
        }

        case SHOW_MODAL_PRODUCT: {
            const newState = createInstance(state);
            newState.showModalState = true;
            return newState;
        }

        case HIDE_MODAL_PRODUCT: {
            const newState = createInstance(state);
            newState.showModalState = false;
            return newState;
        }

        case CHANGE_GROUP_PRODUCT_RADIO: {
            const newState = createInstance(state);
           
            newState.grupos.forEach(json => {
                if(json.grupoProduto.id === action.id) {
                    json.ehPrincipal = true;
                } else {
                    json.ehPrincipal = false;
                }
            });
            return newState;
        }
        
        default:
            return state;
    }
}

export function pushProducts(state, action) {
    const newState = createInstance(state);
    newState.produtos = [];

    action.list.forEach(product => {
        newState.produtos.push({ id: product.id, descricao: product.descricao });
    });

    return newState;
}

export function setProduct(state, action) {
    const newState = createInstance(state);
    newState.produtoSelecionado.id = action.product.id;
    newState.produtoSelecionado.descricao = action.product.descricao;
    return newState;
}

export function clearProduct(newState) {
    newState.produtoSelecionado.id = null;
    newState.produtoSelecionado.descricao = '';

    if (newState.quantidade) {
        newState.quantidade = '';
    }

    if (newState.precoCusto) {
        newState.precoCusto = 0;
    }

    return newState;
}