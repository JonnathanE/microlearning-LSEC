import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// view components
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginUser from '../pages/LoginUser/LoginUser';
import Signup from '../pages/SignUp/Signup';
import LoginAdmin from '../pages/LoginAdmin/LoginAdmin';
import DashBoard from '../pages/DashBoard/DashBoard';
import ShowModules from '../pages/ShowModules/ShowModules';
import UpdateModule from '../pages/UpdateModule/UpdateModule';
import AddModule from '../pages/AddModules/AddModule';
import ShowLessons from '../pages/ShowLessons/ShowLessons';
import AddLesson from '../pages/AddLesson/AddLesson';
import UpdateLesson from '../pages/UpdateLesson/UpdateLesson';
import ViewLesson from '../pages/ViewLesson/ViewLesson';
import ShowMicrolearning from '../pages/ShowMicrolearning/ShowMicrolearning';
import AddMicrolearning from '../pages/AddMicrolearning/AddMicrolearning';
import UpdateMicrolearning from '../pages/UpdateMicrolearning/UpdateMicrolearning';
import ViewMicrolearning from '../pages/ViewMicrolearning/ViewMicrolearning';
import ShowCards from '../pages/ShowCards/ShowCards';
import AddCard from '../pages/AddCard/AddCard';
import UpdateCard from '../pages/UpdateCard/UpdateCard';
import ViewKnowledgeCard from '../pages/ViewKnowledgeCard/ViewKnowledgeCard';
import ShowUsers from '../pages/ShowUsers/ShowUsers';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import Home from '../pages/Home/Home';
import LearningCapsule from '../pages/LearningCapsule/LearningCapsule';

import Progress from '../pages/Progress/Progress';
import Practice from '../components/learn/Practice';

import PrivateRouteAdmin from './PrivateRouteAdmin';
import PublicRouteAdmin from './PublicRouteAdmin';
import PublicRouteStudent from './PublicRouteStudent';
import PrivateRouteStudent from './PrivateRouteStudent';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <PublicRouteStudent path='/signin' exact component={LoginUser} />
                <PublicRouteStudent path='/signup' exact component={Signup} />
                <PrivateRouteStudent path='/learn' exact component={Home} />
                <PrivateRouteStudent path='/learn/practice/:lessonId' exact component={Practice} />
                <PrivateRouteStudent path='/learn/progress' exact component={Progress} />
                <PrivateRouteStudent path='/learn/:lessonId' exact component={LearningCapsule} />

                <PublicRouteAdmin path='/admin/signin' exact component={LoginAdmin} />
                <PrivateRouteAdmin path='/admin/dashboard' exact component={DashBoard} />

                <PrivateRouteAdmin path='/admin/showmodules' exact component={ShowModules} />
                <PrivateRouteAdmin path='/admin/module/create' exact component={AddModule} />
                <PrivateRouteAdmin path='/admin/module/update/:moduleId' exact component={UpdateModule} />

                <PrivateRouteAdmin path='/admin/showlessons' exact component={ShowLessons} />
                <PrivateRouteAdmin path='/admin/lesson/create' exact component={AddLesson} />
                <PrivateRouteAdmin path='/admin/lesson/update/:lessonId' exact component={UpdateLesson} />
                <PrivateRouteAdmin path='/admin/lesson/:lessonId' exact component={ViewLesson} />

                <PrivateRouteAdmin path='/admin/showmicrolearnings' exact component={ShowMicrolearning} />
                <PrivateRouteAdmin path='/admin/micro/create' exact component={AddMicrolearning} />
                <PrivateRouteAdmin path='/admin/micro/update/:microId' exact component={UpdateMicrolearning} />
                <PrivateRouteAdmin path='/admin/micro/:microId' exact component={ViewMicrolearning} />

                <PrivateRouteAdmin path='/admin/showcards' exact component={ShowCards} />
                <PrivateRouteAdmin path='/admin/card/create' exact component={AddCard} />
                <PrivateRouteAdmin path='/admin/card/update/:cardId' exact component={UpdateCard} />
                <PrivateRouteAdmin path='/admin/card/:cardId' exact component={ViewKnowledgeCard} />

                <PrivateRouteAdmin path='/admin/showusers' exact component={ShowUsers} />

                <Route path='/404' component={NotFoundPage} />
                <Route path='*'>
                    <Redirect to='/404' />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;