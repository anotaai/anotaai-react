import sectorReducer from '../reducers/sectorReducer'
import authReducer from '../reducers/authReducer'
import pictureReducer from '../reducers/pictureReducer'
import vendedorReducer from '../reducers/vendedorReducer'
import compradorReducer from '../reducers/compradorReducer'
import createSearchReducerByUseCase from '../reducers/searchReducer'
import createUserReducerByUseCase from '../reducers/userReducer'
import groupProductReducer from '../reducers/groupProductReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { combineReducers } from 'redux'
import { USE_CASE } from '../helpers/constants'

const reducers = combineReducers(
    {auth:authReducer,
     profilePicture:pictureReducer,
     loadingBar:loadingBarReducer,
     detailSector: sectorReducer,
     detailGroupProduct: groupProductReducer,
     searchSector: createSearchReducerByUseCase(USE_CASE.SEARCH_SECTOR),
     searchGroupProduct: createSearchReducerByUseCase(USE_CASE.SEARCH_GROUP_PRODUCT),
     login: createUserReducerByUseCase(USE_CASE.LOGIN),
     modalRenew: createUserReducerByUseCase(USE_CASE.MODAL_RENEW),
     renew: createUserReducerByUseCase(USE_CASE.RENEW),
     vendedor: vendedorReducer,
     comprador: compradorReducer
    });

export default reducers;

 