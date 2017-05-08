
import React from 'react'
import AuthenticationContainer from '../components/Authentication'
import { URL } from '../helpers/constants'
import { Route } from 'react-router'
import Home from '../components/private/Home'
import Login from '../components/public/login/Login'
import Register from '../components/public/register/Register'
import App from '../components/App'
import Vendedor from '../components/public/register/Vendedor'
import Comprador from '../components/public/register/Comprador'
import Search from '../components/private/setor/Search'

const privateRoutes = (
    <Route component={AuthenticationContainer}>
      <Route path={URL.HOME} component={Home} />
      <Route path={URL.SETOR} component={Search} />
    </Route> 
);

 const routes = (
  <Route path="/" component={App} >
    <Route path={URL.DYNAMIC_LOGIN} component={Login} />
    <Route path={URL.REGISTER} component={Register} />
    <Route path={URL.VENDEDOR} component={Vendedor} />
    <Route path={URL.COMPRADOR} component={Comprador} />
    {privateRoutes}
  </Route>
);

export default routes;