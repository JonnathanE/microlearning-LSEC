import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// view components
import LandingPage from '../layout/LandingPage';
import Home from '../layout/Home';
import Sigin from '../components/Signin';
import Signup from '../components/Signup';
import DashBoard from '../layout/DashBoard';
import SigninAdmin from '../components/SigninAdmin';
import NotFoundPage from '../layout/NotFoundPage';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PublicRouteAdmin from './PublicRouteAdmin';
import ShowModules from '../components/ShowModules';
import UpdateModule from '../components/UpdateModule';
import AddModule from '../components/AddModule';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/home' exact component={Home} />
                <Route path='/signin' exact component={Sigin} />
                <Route path='/signup' exact component={Signup} />
                <PublicRouteAdmin path='/admin/signin' exact component={SigninAdmin} />
                <PrivateRouteAdmin path='/admin/dashboard' exact component={DashBoard} />
                <PrivateRouteAdmin path='/admin/showmodules' exact component={ShowModules} />
                <PrivateRouteAdmin path='/admin/module/create' exact component={AddModule} />
                <PrivateRouteAdmin path='/admin/module/update/:moduleId' exact component={UpdateModule} />
                <Route path='/404'  component={NotFoundPage} />
                <Route path='*'>
                    <Redirect to='/404' />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;