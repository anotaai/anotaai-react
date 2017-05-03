window.jQuery = require('jquery');
require('materialize-css');
import 'materialize-css/dist/css/materialize.min.css';
import './styles/css/app.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import authReducer from './reducers/authReducer';
import Cookies from 'universal-cookie'
import {authUser} from './actions/authActionCreator'
import {routes} from './routes/routes'
import { COOKIE_USER , URL } from './helpers/constants'
 
const reducers = combineReducers({auth:authReducer});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

//Check logged user
const cookies = new Cookies();
if (cookies.get(COOKIE_USER)) {
   store.dispatch(authUser());
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
