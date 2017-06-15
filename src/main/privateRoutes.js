import React from 'react'
import Dashboard from '../components/private/Dashboard'
import { Route } from 'react-router'
import AuthenticationContainer from '../components/Authentication'
import { URL } from '../helpers/constants'
import SettingsContainer from '../components/private/profile/Settings'
import NewSectorContainer from '../components/private/sector/detail/NewDetail'
import EditSectorContainer from '../components/private/sector/detail/EditDetail'
import SearchSectorContainer from '../components/private/sector/search/Search'
import NewGroupProductDetailContainer from '../components/private/groupproduct/detail/NewDetail'
import EditGroupProductDetailContainer from '../components/private/groupproduct/detail/EditDetail'
import SearchGroupProductContainer from '../components/private/groupproduct/search/Search'
import SearchConsumerContainer from '../components/private/consumer/search/Search'
import NewConsumerDetailContainer from '../components/private/consumer/detail/NewDetail'
import EditConsumerDetailContainer from '../components/private/consumer/detail/EditDetail'



 const privateRoutes = (
    <Route component={AuthenticationContainer}>
      <Route path={URL.DASHBOARD} component={Dashboard} />
      <Route path={URL.SETTINGS} component={SettingsContainer} />
      <Route path={URL.SECTOR} component={SearchSectorContainer} />
      <Route path={URL.NEW_SECTOR} component={NewSectorContainer} />
      <Route path={URL.EDIT_SECTOR} component={EditSectorContainer} />
      <Route path={URL.GROUP_PRODUCT} component={SearchGroupProductContainer} />
      <Route path={URL.NEW_GROUP_PRODUCT} component={NewGroupProductDetailContainer} />
      <Route path={URL.EDIT_GROUP_PRODUCT} component={EditGroupProductDetailContainer} />
      <Route path={URL.CONSUMER} component={SearchConsumerContainer} />
      <Route path={URL.NEW_CONSUMER} component={NewConsumerDetailContainer} />
      <Route path={URL.EDIT_CONSUMER} component={EditConsumerDetailContainer} />
    </Route> 
);


export default privateRoutes;