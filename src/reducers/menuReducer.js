import {UPDATE_MENU} from '../actions/menuActionCreator'

const INITIAL_STATE = {listMenu:[]}

export default function (state = INITIAL_STATE,action) {
 
  switch (action.type) {
       
       case UPDATE_MENU: {
           return {listMenu:action.itens}
       }

       default:
        return state;
  }

}