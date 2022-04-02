import { useQuery, useQueryClient } from 'react-query';
import Navigation from '../../layout/Navigation';
import { getModulesHome } from '../../api/apiCallsUser';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Section from '../../components/Section/Section';

import './home.css';

const Home = () => {
	const queryClient = useQueryClient();

	const { data, error, isFetching } = useQuery(
		['home', 'modules'],
		getModulesHome
	);

	const MySwal = withReactContent(Swal);

	return (
		<>
			<Navigation />
			<div className='container'>
				{data &&
					data.map(module => (
						<div key={module._id}>
							<div className='row justify-content-center'>
								<div className='col-2 col-sm-2 mt-3'>
									<p className='display-4 number-module rounded-circle text-center'>
										{module.number}
									</p>
								</div>
							</div>
							<div className='row'>
								<div className='col-sm-12'>
									<Section moduleId={module._id} />
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Home;
