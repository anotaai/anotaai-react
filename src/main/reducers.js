import sectorReducer from '../reducers/sectorReducer'
import authReducer from '../reducers/authReducer'
import pictureReducer from '../reducers/pictureReducer'
import vendedorReducer from '../reducers/vendedorReducer'
import compradorReducer from '../reducers/compradorReducer'
import createSearchReducerByUseCase from '../reducers/searchReducer'
import createUserReducerByUseCase from '../reducers/userReducer'
import menuReducer from '../reducers/menuReducer'
import groupProductReducer from '../reducers/groupProductReducer'
import consumerReducer from '../reducers/consumerReducer'
import productReducer from '../reducers/productReducer'
import commodityReducer from '../reducers/commodityReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { combineReducers } from 'redux'
import { USE_CASE } from '../helpers/constants'

const reducers = combineReducers(
    {auth:authReducer,
     profilePicture:pictureReducer,
     loadingBar:loadingBarReducer,
     detailConsumer: consumerReducer,
     detailSector: sectorReducer,
     detailGroupProduct: groupProductReducer,
     detailProduct: productReducer,
     detailCommodity: commodityReducer,
     searchSector: createSearchReducerByUseCase(USE_CASE.SEARCH_SECTOR),
     searchGroupProduct: createSearchReducerByUseCase(USE_CASE.SEARCH_GROUP_PRODUCT),
     searchConsumer: createSearchReducerByUseCase(USE_CASE.SEARCH_CONSUMER),
     searchProduct: createSearchReducerByUseCase(USE_CASE.SEARCH_PRODUCT),
     searchCommodity: createSearchReducerByUseCase(USE_CASE.SEARCH_COMMODITY),
     login: createUserReducerByUseCase(USE_CASE.LOGIN),
     modalRenew: createUserReducerByUseCase(USE_CASE.MODAL_RENEW),
     renew: createUserReducerByUseCase(USE_CASE.RENEW),
     vendedor: vendedorReducer,
     comprador: compradorReducer,
     menu: menuReducer
    });

export default reducers;

 