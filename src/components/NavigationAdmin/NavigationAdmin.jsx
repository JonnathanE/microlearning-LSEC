import { NavLink, Link } from 'react-router-dom';
import useAuth from '../../auth/useAuth';

import {
	FaHome,
	FaSignOutAlt,
	FaUserCircle,
	FaBook,
	FaLeanpub,
	FaSignLanguage,
	FaAmericanSignLanguageInterpreting,
	FaPlus,
	FaList,
} from 'react-icons/fa';

const NavigationAdmin = () => {
	const auth = useAuth();

	return (
		<>
			<nav className='navbar sticky-top navbar-expand-sm navbar-dark bg-dark'>
				<div className='container-fluid'>
					<NavLink exact to='/admin/dashboard' className='navbar-brand'>
						PANEL ADMIN
					</NavLink>

					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNav'
					>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav m-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<NavLink exact to='/admin/dashboard' className='nav-link'>
									<FaHome /> INICIO
								</NavLink>
							</li>
							<li className='nav-item dropdown'>
								<NavLink
									exact
									to=''
									className='nav-link dropdown-toggle'
									id='dropdownModulos'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									<FaBook /> Módulos
								</NavLink>
								<ul className='dropdown-menu' aria-labelledby='dropdownModulos'>
									<li>
										<NavLink
											to='/admin/module/create'
											className='dropdown-item'
										>
											<FaPlus /> Crear Módulo
										</NavLink>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<NavLink to='/admin/showmodules' className='dropdown-item'>
											<FaList /> Listar todos los módulos
										</NavLink>
									</li>
								</ul>
							</li>
							<li className='nav-item dropdown'>
								<NavLink
									exact
									to=''
									className='nav-link dropdown-toggle'
									id='dropdownModulos'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									<FaLeanpub /> Lecciones
								</NavLink>
								<ul className='dropdown-menu' aria-labelledby='dropdownModulos'>
									<li>
										<NavLink
											to='/admin/lesson/create'
											className='dropdown-item'
										>
											<FaPlus /> Crear Lección
										</NavLink>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<NavLink to='/admin/showlessons' className='dropdown-item'>
											<FaList /> Listar todas las lecciones
										</NavLink>
									</li>
								</ul>
							</li>
							<li className='nav-item dropdown'>
								<NavLink
									exact
									to=''
									className='nav-link dropdown-toggle'
									id='dropdownModulos'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									<FaSignLanguage /> Microcontenido
								</NavLink>
								<ul className='dropdown-menu' aria-labelledby='dropdownModulos'>
									<li>
										<NavLink to='/admin/micro/create' className='dropdown-item'>
											<FaPlus /> Crear Microcontenido
										</NavLink>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<NavLink
											to='/admin/showmicrolearnings'
											className='dropdown-item'
										>
											<FaList /> Listar todos los Microcontenidos
										</NavLink>
									</li>
								</ul>
							</li>
							<li className='nav-item dropdown'>
								<NavLink
									exact
									to=''
									className='nav-link dropdown-toggle'
									id='dropdownModulos'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									<FaAmericanSignLanguageInterpreting /> Pruebas
								</NavLink>
								<ul className='dropdown-menu' aria-labelledby='dropdownModulos'>
									<li>
										<NavLink to='/admin/card/create' className='dropdown-item'>
											<FaPlus /> Crear Prueba
										</NavLink>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<NavLink to='/admin/showcards' className='dropdown-item'>
											<FaList /> Listar todas las pruebas
										</NavLink>
									</li>
								</ul>
							</li>
						</ul>
						<ul className='nav navbar-nav navbar-right'>
							<li className='nav-item dropdown'>
								<NavLink
									exact
									to=''
									className='nav-link dropdown-toggle'
									id='dropdownModulos'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									{auth.user.name} <FaUserCircle />
								</NavLink>
								<ul className='dropdown-menu' aria-labelledby='dropdownModulos'>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<Link to='' onClick={auth.logout} className='dropdown-item'>
											<FaSignOutAlt /> Cerrar Sesión
										</Link>
									</li>
								</ul>
							</li>
						</ul>
						<ul></ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavigationAdmin;
