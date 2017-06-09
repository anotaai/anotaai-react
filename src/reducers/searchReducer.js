import { PAGE_SIZE } from '../helpers/constants'
import { createInstance, clearAllPropertiesObject } from '../helpers/jsonHelper'

const INITIAL_STATE = {
    filteredResults: [], pageCount: 0
}

export default function createSearchReducerByUseCase(useCase = '') {

    return function (state = INITIAL_STATE, action) {

        switch (action.type) {

            case `REMOVE_${useCase}`: {
                const newState = createInstance(state);
                const filtered = newState.filteredResults.filter(item => item.id !== action.id);
                newState.filteredResults = filtered;
                return newState;
            }

            case `LIST_${useCase}`: {
                const newState = createInstance(state);
                newState.filteredResults = action.filteredResults.list.itens;
                newState.pageCount = Math.ceil(action.filteredResults.list.qtdTotalItens / PAGE_SIZE);
                return newState;
            }

            case `CLEAR_FORM_${useCase}`: {
                const newState = createInstance(state);
                clearAllPropertiesObject(newState);
                return newState;
            }

            default:
                return state;
        }
    }

}