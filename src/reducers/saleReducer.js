import { HANDLE_INPUT_CHANGE_SALE } from '../actions/saleActionCreator'

const INITIAL_STATE  = {

}

export default function (state = INITIAL_STATE, action ) {
     
    switch(action.type) {
         
        case HANDLE_INPUT_CHANGE_SALE: {
            return state;
        }
        
        default: {
            return state;
        }
         
    }
}