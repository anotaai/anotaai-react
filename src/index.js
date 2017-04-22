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
import Registrar from './components/public/registrar/Registrar'
import Layout from './components/public/Layout'
import Vendedor from './components/public/registrar/Vendedor'
import Comprador from './components/public/registrar/Comprador'
import {urlHome,urlLogin,urlRegistrar,urlComprador,urlVendedor} from './helpers/constants'

const reducers = combineReducers({app:app});
const store = createStore(reducers,applyMiddleware(thunkMiddleware));

const routes = (
      <Route store={store}  path="/" component={Layout} >
         <Route  path={urlHome} component={Home} />
         <Route  path={urlLogin} component={Login} />
         <Route  path={urlRegistrar} component={Registrar} />
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
