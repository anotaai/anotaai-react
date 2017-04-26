window.jQuery = require('jquery');
require('materialize-css');
import 'materialize-css/dist/css/materialize.min.css';
import './styles/css/app.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route, browserHistory} from 'react-router'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {app} from './reducers/app'
import Home from './components/public/Home'
import Login from './components/public/login/Login'
import Register from './components/public/register/Register'
import Layout from './components/public/Layout'
import Vendedor from './components/public/register/Vendedor'
import Comprador from './components/public/register/Comprador'
import {urlHome,urlLogin,urlRegister,urlComprador,urlVendedor} from './helpers/constants'

const reducers = combineReducers({app:app});
const store = createStore(reducers,applyMiddleware(thunkMiddleware));

const routes = (
      <Route store={store}  path="/" component={Layout} >
         <Route  path={urlHome} component={Home} />
         <Route  path={urlLogin} component={Login} />
         <Route  path={urlRegister} component={Register} />
         <Route  path={urlVendedor} component={Vendedor}  />
         <Route  path={urlComprador} component={Comprador}  />
      </Route>
);

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
);
