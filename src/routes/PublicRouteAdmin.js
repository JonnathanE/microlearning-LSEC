import { Route, Redirect } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const PublicRouteAdmin = ({ component: Component, ...rest }) => {
	const auth = useAuth();

	return (
		<Route {...rest}>
			{!auth.isAdmin() ? <Component /> : <Redirect to='/admin/dashboard' />}
		</Route>
	);
};

export default PublicRouteAdmin;
