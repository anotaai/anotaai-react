import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import routes from './main/routes'
import reducers from './main/reducers'
import AuthenticationService from './services/app/AuthenticationService'
import registerFetchInterceptor from './services/app/fetchInterceptor'
import 'materialize-css/dist/css/materialize.min.css'
import './styles/css/app.css'
import './styles/css/material-icons.css'
import 'rc-collapse/assets/index.css';
import 'react-simple-dropdown/styles/Dropdown.css';
import 'react-toastify/dist/ReactToastify.min.css'
require('materialize-css/bin/materialize.js');
const i18nReactLoader = require("i18n-react-loader");

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
AuthenticationService.checkUserCookie(store);
registerFetchInterceptor(store);

i18nReactLoader.default.init({
    useExternalAPI: true,
    apiURL: `${process.env.REACT_APP_URL_BACKEND}/i18n/locales`,
    defaultLocale: 'en',
  }).then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>,
      document.getElementById('root')
    );
});