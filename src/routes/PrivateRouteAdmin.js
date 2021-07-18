import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const PrivateRouteAdmin = ({component: Component, ...rest}) => {
    //const user = null;
    //const user = {id:'1'};
    const auth = useAuth();
    return (
        <Route {...rest}>
            {auth.isLogged() ? <Component /> : <Redirect to='/admin/signin'/>}
        </Route>
    )
}

export default PrivateRouteAdmin;