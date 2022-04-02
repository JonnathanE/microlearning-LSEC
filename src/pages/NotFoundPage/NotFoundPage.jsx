import { NavLink } from 'react-router-dom';

import './notFoundPage.css';

const NotFoundPage = (req, res) => {
	return (
		<>
			<h2>Error 404</h2>
			<p className='zoom-area'>
				<b>Página no enontrada</b>
			</p>
			<p className='zoom-area'>
				La página que está buscando se movió, eliminó, renombró o nunca existió{' '}
			</p>
			<section className='error-container'>
				<span className='four'>
					<span className='screen-reader-text'>4</span>
				</span>
				<span className='zero'>
					<span className='screen-reader-text'>0</span>
				</span>
				<span className='four'>
					<span className='screen-reader-text'>4</span>
				</span>
				<div className='link-container'>
					<NavLink to='/' className='more-link'>
						Volver a la página principal
					</NavLink>
				</div>
			</section>
		</>
	);
};

export default NotFoundPage;
