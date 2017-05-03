
import React from 'react'
import Authentication from '../components/Authentication'
import { URL } from '../helpers/constants'
import { Route } from 'react-router'
import Home from '../components/private/Home'
import Login from '../components/public/login/Login'
import Register from '../components/public/register/Register'
import App from '../components/App'
import Vendedor from '../components/public/register/Vendedor'
import Comprador from '../components/public/register/Comprador'

const privateRoutes = (
    <Route component={Authentication}>
      <Route path={URL.HOME} component={Home} />
    </Route> 
);

export const routes = (
  <Route path="/" component={App} >
    <Route path={URL.LOGIN} component={Login} />
    <Route path={URL.REGISTER} component={Register} />
    <Route path={URL.VENDEDOR} component={Vendedor} />
    <Route path={URL.COMPRADOR} component={Comprador} />
    {privateRoutes}
  </Route>
);