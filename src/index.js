window.jQuery = require('jquery');
require('materialize-css');
import 'materialize-css/dist/css/materialize.min.css';
import './styles/css/app.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import Home from './components/private/Home'
import Login from './components/public/login/Login'
import Register from './components/public/register/Register'
import App from './components/public/App'
import Vendedor from './components/public/register/Vendedor'
import Comprador from './components/public/register/Comprador'
import { urlHome, urlLogin, urlRegister, urlComprador, urlVendedor } from './helpers/constants'
import authReducer from './reducers/authReducer';
import Authentication from './components/Authentication'

const reducers = combineReducers({auth:authReducer});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const privateRoutes = (
    <Route component={Authentication}>
      <Route path={urlHome} component={Home} />
    </Route> 
);
const routes = (
  <Route path="/" component={App} >
    <Route path={urlLogin} component={Login} />
    <Route path={urlRegister} component={Register} />
    <Route path={urlVendedor} component={Vendedor} />
    <Route path={urlComprador} component={Comprador} />
    {privateRoutes}
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
