window.jQuery = require('jquery');
require('materialize-css');
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route, browserHistory} from 'react-router'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {app} from './reducers/app'
import Home from './components/public/Home'
import Login from './components/public/login/Login'
import Registrar from './components/public/registrar/Registrar'
import {urlHome,urlLogin,urlRegistrar} from './helpers/constants'
import './styles/css/app.css'
import Layout from './components/public/Layout'


const reducers = combineReducers({app:app});
const store = createStore(reducers,applyMiddleware(thunkMiddleware));

const routes = (
      <Route store={store}  path="/" component={Layout} >
         <Route  path={urlHome} component={Home} />
         <Route  path={urlLogin} component={Login} />
         <Route  path={urlRegistrar} component={Registrar}  />
      </Route>
);

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
);
