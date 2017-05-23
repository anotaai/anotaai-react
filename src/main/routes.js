import React from 'react'
import AuthenticationContainer from '../components/Authentication'
import { URL } from '../helpers/constants'
import { Route , IndexRoute } from 'react-router'
import Home from '../components/public/Home'
import LoginContainer from '../components/public/login/Login'
import Register from '../components/public/register/Register'
import App from '../components/App'
import VendedorContainer from '../components/public/register/Vendedor'
import CompradorContainer from '../components/public/register/Comprador'
import SearchContainer from '../components/private/sector/Search'
import Dashboard from '../components/private/Dashboard'
import RenewPassword from '../components/public/renew/RenewPassword'
import SettingsContainer from '../components/private/profile/Settings'
import Activate from '../components/public/activation/Activate'

const privateRoutes = (
    <Route component={AuthenticationContainer}>
      <Route path={URL.DASHBOARD} component={Dashboard} />
      <Route path={URL.SETOR} component={SearchContainer} />
      <Route path={URL.SETTINGS} component={SettingsContainer} />
    </Route> 
);

 const routes = (
  <Route path="/" component={App} >
    <IndexRoute path="/" component={Home} />
    <Route path={URL.ACTIVATE} component={Activate} />
    <Route path={URL.LOGIN} component={LoginContainer} />
    <Route path={URL.REGISTER} component={Register} />
    <Route path={URL.VENDEDOR} component={VendedorContainer} />
    <Route path={URL.COMPRADOR} component={CompradorContainer} />
    <Route path={URL.RENEW_PASSWORD} component={RenewPassword} />
    {privateRoutes}
  </Route>
);

export default routes;