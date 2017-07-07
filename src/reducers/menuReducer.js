import { UPDATE_MENU, TOGGLE_MENU } from '../actions/menuActionCreator'
import { createInstance } from '../helpers/jsonHelper'

 const FULL_CLASS_CONTENT = 'col s12 l12', NORMAL_CLASS_CONTENT = 'col s12 l10' , 
HIDE_CLASS_MENU = 'hide-menu' ,  NORMAL_CLASS_MENU = 'col s2 l2 show-menu' , 
INITIAL_STATE = {listMenu:[], showMenu: true , classMenu: NORMAL_CLASS_MENU , classContent: NORMAL_CLASS_CONTENT} 


export default function (state = INITIAL_STATE,action) {
 
  switch (action.type) {
       
       case UPDATE_MENU: {
           const newState = createInstance(state);
           newState.listMenu = action.itens;
           return newState
       }

        case TOGGLE_MENU: {
           const newState = createInstance(state);
           
           if(newState.showMenu) {
              newState.showMenu = false;
              newState.classMenu =  HIDE_CLASS_MENU;
              newState.classContent =  FULL_CLASS_CONTENT;    
           } else {
              newState.showMenu = true;
              newState.classMenu =  NORMAL_CLASS_MENU;
              newState.classContent =  NORMAL_CLASS_CONTENT;
           }

           return newState;
       }

       default:
        return state;
  }

}