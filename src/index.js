window.jQuery = require('jquery');
require('materialize-css');
import 'materialize-css/dist/css/materialize.min.css'
import './styles/css/app.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import authReducer from './reducers/authReducer'
import Cookies from 'universal-cookie'
import {authUser} from './actions/authActionCreator'
import {routes} from './routes/routes'
import { COOKIE_USER , URL } from './helpers/constants'
import { loadingBarReducer } from 'react-redux-loading-bar'

const reducers = combineReducers({auth:authReducer,loadingBar:loadingBarReducer});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

//Check logged user
const cookies = new Cookies();
const cookieLoginState = cookies.get(COOKIE_USER);
if (cookieLoginState) {
   store.dispatch(authUser(cookieLoginState));
   browserHistory.push(URL.HOME);
} 

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
