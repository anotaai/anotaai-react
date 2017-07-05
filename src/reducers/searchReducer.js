import { PAGE_SIZE } from '../helpers/constants'
import { createInstance } from '../helpers/jsonHelper'

const INITIAL_STATE = {
    filteredResults: [], pageCount: 0 , offset: 0, showModalState: false, idRemove: 0
}

export default function createSearchReducerByUseCase(useCase = '') {

    return function (state = INITIAL_STATE, action) {

        switch (action.type) {
            
            case `LIST_${useCase}`: {
                const newState = createInstance(state);
                newState.filteredResults = action.filteredResults.list.itens;
                newState.pageCount = Math.ceil(action.filteredResults.list.qtdTotalItens / PAGE_SIZE);
                return newState;
            }

            case `REMOVE_${useCase}`: {
                const newState = createInstance(state);
                const filtered = newState.filteredResults.filter(item => item.id !== action.id);
                newState.filteredResults = filtered;
                newState.showModalState = false;
                newState.idRemove = 0;
                return newState;
            }

            case `HANDLE_PAGE_CLICK_${useCase}`: {
                const newState = createInstance(state);
                newState.offset = action.offset;
                return newState;
            }

            case `CLEAR_FORM_${useCase}`: {
                const newState = createInstance(state);
                newState.filteredResults = [];
                newState.offset = 0;
                newState.pageCount = 0;
                return newState;
            }


             case `SHOW_MODAL_${useCase}`: {
                const newState = createInstance(state);
                newState.showModalState = true;
                newState.idRemove = action.idRemove;
                return newState;
            }

             case `HIDE_MODAL_${useCase}`: {
                const newState = createInstance(state);
                newState.showModalState = false;
                return newState;
            }

            default:
                return state;
        }
    }

}