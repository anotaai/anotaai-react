import { createInstance } from '../helpers/jsonHelper'
import { LOGIN, EXIT } from '../actions/renewLoginActionCreator';

const INITIAL_STATE = { showModalState: false }

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {
    case LOGIN:
      return { renewLogin: null };
    case EXIT:
        const newState = createInstance(state);
        return newState;

    default:
      return state;
  }

}