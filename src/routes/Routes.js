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
import ShowLessons from '../components/ShowLessons';
import Lesson from '../components/Lesson';
import AddLesson from '../components/AddLesson';
import UpdateLesson from '../components/UpdateLesson';
import ShowMicrolearning from '../components/ShowMicrolearning';
import Microlearning from '../components/Microlearning';
import AddMicrolearning from '../components/AddMicrolearning';
import UpdateMicrolearning from '../components/UpdateMicrolearning';
import PublicRouteStudent from './PublicRouteStudent';
import PrivateRouteStudent from './PrivateRouteStudent';
import LearningCapsule from '../components/LearningCapsule';
import ShowCards from '../components/card/ShowCards';
import AddCard from '../components/card/AddCard';
import KnowledgeCard from '../components/card/KnowledgeCard';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <PublicRouteStudent path='/signin' exact component={Sigin} />
                <PublicRouteStudent path='/signup' exact component={Signup} />
                <PrivateRouteStudent path='/learn' exact component={Home} />
                <PrivateRouteStudent path='/learn/:lessonId' exact component={LearningCapsule} />

                <PublicRouteAdmin path='/admin/signin' exact component={SigninAdmin} />
                <PrivateRouteAdmin path='/admin/dashboard' exact component={DashBoard} />

                <PrivateRouteAdmin path='/admin/showmodules' exact component={ShowModules} />
                <PrivateRouteAdmin path='/admin/module/create' exact component={AddModule} />
                <PrivateRouteAdmin path='/admin/module/update/:moduleId' exact component={UpdateModule} />

                <PrivateRouteAdmin path='/admin/showlessons' exact component={ShowLessons} />
                <PrivateRouteAdmin path='/admin/lesson/create' exact component={AddLesson} />
                <PrivateRouteAdmin path='/admin/lesson/update/:lessonId' exact component={UpdateLesson} />
                <PrivateRouteAdmin path='/admin/lesson/:lessonId' exact component={Lesson} />

                <PrivateRouteAdmin path='/admin/showmicrolearnings' exact component={ShowMicrolearning} />
                <PrivateRouteAdmin path='/admin/micro/create' exact component={AddMicrolearning} />
                <PrivateRouteAdmin path='/admin/micro/update/:microId' exact component={UpdateMicrolearning} />
                <PrivateRouteAdmin path='/admin/micro/:microId' exact component={Microlearning} />
                
                <PrivateRouteAdmin path='/admin/showcards' exact component={ShowCards} />
                <PrivateRouteAdmin path='/admin/card/create' exact component={AddCard} />
                <PrivateRouteAdmin path='/admin/card/:cardId' exact component={KnowledgeCard} />

                <Route path='/404'  component={NotFoundPage} />
                <Route path='*'>
                    <Redirect to='/404' />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;