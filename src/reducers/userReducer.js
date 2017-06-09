import { createInstance, clearAllPropertiesObject, getObjectNewState } from '../helpers/jsonHelper'
 
const INITIAL_STATE = {
    userLogin: { usuario: { id: 0, email: '', telefone: '', senha: '', codigoAtivacao: '' } },
    confirmarSenha: '',
    showModal: false
}

export default function createUserReducerByUseCase(useCase = '') {

    return function (state = INITIAL_STATE, action) {

        switch (action.type) {

            case `HANDLE_INPUT_CHANGE_${useCase}`: {
                const newState = getObjectNewState(action.name, action.value, state);
                return newState;
            }

            case `CLEAR_FORM_${useCase}`: {
                const newState = createInstance(state);
                clearAllPropertiesObject(newState);
                newState.userLogin.usuario.telefone = '';
                return newState;
            }

            case `CLEAR_PASSWORD_${useCase}`: {
                const newState = createInstance(state);
                newState.userLogin.usuario.senha = '';
                newState.confirmarSenha = '';
                return newState;
            }

            case `SHOW_MODAL_${useCase}`: { 
                const newState = createInstance(state);
                newState.showModal = true;
                return newState
            }

            case `HIDE_MODAL_${useCase}`: { 
                const newState = createInstance(state);
                newState.showModal = false;
                return newState
            }

            case `UPDATE_USER_${useCase}`: { 
                const newState = createInstance(state);
                newState.userLogin.usuario.id = action.entity.id;
                newState.userLogin.usuario.dataCadastro = action.entity.dataCadastro;
                newState.userLogin.usuario.email = action.entity.email;
                newState.userLogin.usuario.telefone = action.entity.telefone;
                newState.userLogin.usuario.nome = action.entity.nome;
                newState.userLogin.usuario.codigoAtivacao = action.activationCode;
                return newState
            }

            default:
                return state;
        }
    }

}