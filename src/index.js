window.jQuery = require('jquery');
const i18nReactLoader = require("i18n-react-loader");
require('materialize-css');
import 'materialize-css/dist/css/materialize.min.css'
import './styles/css/app.css'
import './styles/css/material-icons.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import routes from './main/routes'
import reducers from './main/reducers'
import AuthenticationService from './services/app/AuthenticationService'

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
AuthenticationService.checkUserCookie(store);


i18nReactLoader.default.init({
  useExternalAPI: false,
  defaultLocale: 'pt',
  localSupportedLocales: require('./resources/i18n/localeSuported.json'),
  localLocaleMap: {
    en: require('./resources/i18n/locales/en.json'),
    pt: require('./resources/i18n/locales/pt.json'),
  },
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


