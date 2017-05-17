import { UPDATE_PICTURE } from '../actions/pictureActionCreator';
import blank_avatar from '../img/blank_avatar.png'

const INITIAL_STATE = { pictureState: blank_avatar }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_PICTURE:
      return { pictureState: action.pictureState };
    default:
      return state;
  }
}