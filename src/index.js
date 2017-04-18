window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min');
require('materialize-css');
require('materialize-css/js/toasts');
 
import 'materialize-css/dist/css/materialize.min.css';
//https://github.com/Dogfalo/materialize/issues/1229
import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route, browserHistory} from 'react-router'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {app} from './reducers/app'
import Home from './components/public/Home'
import Login from './components/public/login/Login'
import Cadastro from './components/public/cadastro/Cadastro'

import './styles/css/Layout.css'
import Layout from './components/public/Layout'


const reducers = combineReducers({app:app});
const store = createStore(reducers,applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Router history={browserHistory}>
      <Route store={store}  path="/" component={Layout} >
         <Route  path="/home" component={Home} />
         <Route  path="/login" component={Login} />
         <Route  path="/cadastro" component={Cadastro} />
      </Route>
  </Router>,
  document.getElementById('root')
);
