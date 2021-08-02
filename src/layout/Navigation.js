import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import useAuth from '../auth/useAuth';

import { VscAccount } from "react-icons/vsc";
import { FaSignInAlt, FaUserAstronaut, FaSignOutAlt, FaUserCog } from "react-icons/fa";

const Navigation = () => {
    const auth = useAuth();
    return (
        <>
            <nav className='navbar sticky-top navbar-expand-sm navbar-dark bg-dark'>
                <div className='container'>
                    <NavLink exact to='/home' className='navbar-brand'>LSEC</NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0 navbar-right">
                        </ul>
                        <ul className="nav navbar-nav navbar-right">

                            {!auth.isLogged() && (
                                <>
                                    <li><NavLink to='/signup' className='nav-link'><VscAccount /> Crear cuenta</NavLink></li>
                                    <li><NavLink to='/signin' className='nav-link'><FaSignInAlt /> Iniciar Sesión</NavLink></li>
                                </>
                            )}

                            {auth.isLogged() && (
                                <li className='nav-item dropdown'>
                                    <NavLink exact to='#' className='nav-link dropdown-toggle' id="dropdownModulos" data-bs-toggle="dropdown" aria-expanded="false"><FaUserAstronaut /> {auth.user.user.name}</NavLink>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownModulos">
                                        <li><NavLink to='/user' className="dropdown-item"><FaUserCog /> Configuraciones</NavLink></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link
                                            onClick={auth.logout} className="dropdown-item"><FaSignOutAlt /> Cerrar Sesión</Link></li>
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