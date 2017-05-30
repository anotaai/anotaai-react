import React from 'react'
import Dashboard from '../components/private/Dashboard'
import { Route } from 'react-router'
import AuthenticationContainer from '../components/Authentication'
import { URL } from '../helpers/constants'
import SettingsContainer from '../components/private/profile/Settings'
import NewSectorContainer from '../components/private/sector/NewDetail'
import EditSectorContainer from '../components/private/sector/EditDetail'
import SearchSectorContainer from '../components/private/sector/Search'


 const privateRoutes = (
    <Route component={AuthenticationContainer}>
      <Route path={URL.DASHBOARD} component={Dashboard} />
      <Route path={URL.SETTINGS} component={SettingsContainer} />
      <Route path={URL.SECTOR} component={SearchSectorContainer} />
      <Route path={URL.NEW_SECTOR} component={NewSectorContainer} />
      <Route path={URL.EDIT_SECTOR} component={EditSectorContainer} />
    </Route> 
);


export default privateRoutes;