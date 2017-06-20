import { HANDLE_INPUT_CHANGE_VENDEDOR, CLEAR_FORM_VENDEDOR, CLEAR_ADDRESS, UPDATE_ENUM, HANDLE_PHONE_CHANGE_VENDEDOR, UPDATE_ADDRESS, CLEAR_PASSWORD_VENDEDOR } from '../actions/vendedorActionCreator'
import { createInstance, getObjectNewState, clearAllPropertiesObject } from '../helpers/jsonHelper'

const INITIAL_STATE = {
    usuario: { nome: '', email: '', senha: '' },
    cliente: { nomeComercial: '', cpf: '', type: 'cliente' , endereco: { cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' } },
    estadoList: [],
    confirmarSenha: '',
    telefone: '',
    telefoneRetornado: '',
    cepRetornado: ''
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case HANDLE_INPUT_CHANGE_VENDEDOR: {
            const newState = getObjectNewState(action.name, action.value, state);
            return newState;
        }
        case CLEAR_FORM_VENDEDOR: {
            const newState = createInstance(state);
            clearAllPropertiesObject(newState);
            newState.cliente.type = 'cliente';
            return newState;
        }
        case CLEAR_PASSWORD_VENDEDOR: {
            const newState = createInstance(state);
            newState.usuario.senha = '';
            newState.confirmarSenha = '';
            return newState;
        }
        case HANDLE_PHONE_CHANGE_VENDEDOR: {
            const newState = createInstance(state);
            newState.usuario.nome = action.entity.nome;
            newState.usuario.email = action.entity.email;
            newState.telefoneRetornado = 'S';
            return newState;
        }

        case UPDATE_ENUM: {
            const newState = createInstance(state);
            newState.estadoList = action.json;
            return newState;
        }
        case UPDATE_ADDRESS: {
            const newState = createInstance(state);
            newState.cliente.endereco.logradouro = action.endereco.logradouro;
            newState.cliente.endereco.bairro = action.endereco.bairro;
            newState.cliente.endereco.cidade = action.endereco.localidade;
            newState.cliente.endereco.estado = action.endereco.uf;
            newState.cepRetornado = 'S';
            return newState;
        }
        case CLEAR_ADDRESS: {
            const newState = createInstance(state);
            newState.cliente.endereco.cep = '';
            newState.cliente.endereco.logradouro = '';
            newState.cliente.endereco.numero = '';
            newState.cliente.endereco.complemento = '';
            newState.cliente.endereco.bairro = '';
            newState.cliente.endereco.cidade = '';
            newState.cliente.endereco.estado = '';
            return newState;
        }

        default:
            return state;

    }
}