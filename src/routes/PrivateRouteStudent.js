import { Route, Redirect, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const PrivateRouteStudent = ({ component: Component, ...rest }) => {
	const auth = useAuth();
	const location = useLocation();

	return (
		<Route {...rest}>
			{auth.isLogged() ? (
				<Component />
			) : (
				<Redirect to={{ pathname: '/signin', state: { from: location } }} />
			)}
		</Route>
	);
};

export default PrivateRouteStudent;
