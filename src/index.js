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
import App from './components/App'
import Vendedor from './components/public/register/Vendedor'
import Comprador from './components/public/register/Comprador'
import { URL_HOME, URL_LOGIN, URL_REGISTER, URL_COMPRADOR, URL_VENDEDOR } from './helpers/constants'
import authReducer from './reducers/authReducer';
import Authentication from './components/Authentication'

const reducers = combineReducers({auth:authReducer});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const privateRoutes = (
    <Route component={Authentication}>
      <Route path={URL_HOME} component={Home} />
    </Route> 
);
const routes = (
  <Route path="/" component={App} >
    <Route path={URL_LOGIN} component={Login} />
    <Route path={URL_REGISTER} component={Register} />
    <Route path={URL_VENDEDOR} component={Vendedor} />
    <Route path={URL_COMPRADOR} component={Comprador} />
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
