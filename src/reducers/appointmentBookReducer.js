import { HANDLE_INPUT_CHANGE_APPOINTMENT } from '../actions/appointmentBookActionCreator'


const INITIAL_STATE = {
    
}

export default function (state = INITIAL_STATE,action) {
     
    switch(action.type) {
       
        case HANDLE_INPUT_CHANGE_APPOINTMENT: {

            return state;
        }

        default: return state;

    }
}
