import authReducer from '../reducers/authReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import {combineReducers} from 'redux'

const reducers = combineReducers(
    {auth:authReducer,
     loadingBar:loadingBarReducer
    });

export default reducers;