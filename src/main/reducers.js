import authReducer from '../reducers/authReducer'
import pictureReducer from '../reducers/pictureReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import {combineReducers} from 'redux'

const reducers = combineReducers(
    {auth:authReducer,
     profilePicture:pictureReducer,
     loadingBar:loadingBarReducer
    });

export default reducers;