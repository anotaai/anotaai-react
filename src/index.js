import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/public/Layout';
import {Router,Route, browserHistory} from 'react-router'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {app} from './reducers/app'
import Home from './components/public/Home'
import 'material-components-web/dist/material-components-web.css';
import './styles/css/Layout.css'

const reducers = combineReducers({app:app});
const store = createStore(reducers,applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Router history={browserHistory}>
      <Route store={store}  path="/" component={Layout} >
         <Route exact path="/home" component={Home} />
      </Route>
  </Router>,
  document.getElementById('root')
);
