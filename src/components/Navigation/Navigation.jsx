import { Link, NavLink } from 'react-router-dom';

import useAuth from '../../auth/useAuth';

import { VscAccount } from "react-icons/vsc";
import { FaSignInAlt, FaUserAstronaut, FaSignOutAlt, FaGraduationCap, FaTrophy } from "react-icons/fa";


const Navigation = () => {
    const auth = useAuth();
    return (
        <>
            <nav className='navbar sticky-top navbar-expand-sm navbar-dark bg-dark'>
                <div className='container'>

                    <NavLink exact to='/learn' className='navbar-brand fw-bold'>Aprende LSEC</NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                            <li className='nav-item d-flex focus-item'>
                                <NavLink to='/learn' className='nav-link aling-self-center h5'><FaGraduationCap /> Aprender</NavLink>
                            </li>
                            <li className='nav-item d-flex'>
                                <NavLink to='/learn/progress' className='nav-link aling-self-center h5'><FaTrophy /> Progreso</NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav">

                            {!auth?.isLogged() && (
                                <>
                                    <li className='nav-item me-1'>
                                        <NavLink to='/signin' className='btn btn-light'><FaSignInAlt /> Iniciar Sesión</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to='/signup' className='btn btn-primary'><VscAccount /> Crear cuenta</NavLink>
                                    </li>
                                </>
                            )}

                            {auth?.isLogged() && (
                                <li className='nav-item dropdown'>

                                    <NavLink exact to='#' className='nav-link dropdown-toggle h5' id="dropdownModulos" data-bs-toggle="dropdown" aria-expanded="false"> {auth?.user.name} <FaUserAstronaut /></NavLink>

                                    <ul className="dropdown-menu" aria-labelledby="dropdownModulos">
                                        {/** 
                                        <li><NavLink to='/user' className="dropdown-item"><FaUserCog /> Configuraciones</NavLink></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        */}
                                        <li><Link to=''
                                            onClick={auth.logout} className="dropdown-item"><FaSignOutAlt /> Cerrar Sesión</Link>
                                        </li>
                                    </ul>

                                </li>
                            )}

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation;