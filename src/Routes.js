import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// view components
import LandingPage from './layout/LandingPage';
import Home from './layout/Home';
import Sigin from './components/Signin';
import Signup from './components/Signup';
import Admin from './layout/Admin';
import SigninAdmin from './components/SigninAdmin';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/home' exact component={Home} />
                <Route path='/signin' exact component={Sigin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/admin/panel' exact component={Admin} />
                <Route path='/admin/signin' exact component={SigninAdmin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;