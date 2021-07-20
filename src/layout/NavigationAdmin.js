import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const NavigationAdmin = () => {

    const auth = useAuth();

    return (
        <>
            <nav className='navbar sticky-top navbar-expand-sm navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <NavLink exact to='/admin/dashboard' className='navbar-brand'>PANEL ADMIN</NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className='navbar-nav m-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <NavLink exact to='/admin/dashboard' className='nav-link'>INICIO</NavLink>
                            </li>
                            <li className='nav-item dropdown'>
                                <NavLink exact to='#' className='nav-link dropdown-toggle' id="dropdownModulos" data-bs-toggle="dropdown" aria-expanded="false">Módulos</NavLink>
                                <ul className="dropdown-menu" aria-labelledby="dropdownModulos">
                                    <li><NavLink to='/admin/module/create' className="dropdown-item">Crear Módulo</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink to='/admin/showmodules' className="dropdown-item">Listar todos los módulos</NavLink></li>
                                </ul>
                            </li>
                            <li className='nav-item dropdown'>
                                <NavLink exact to='#' className='nav-link dropdown-toggle' id="dropdownModulos" data-bs-toggle="dropdown" aria-expanded="false">Lecciones</NavLink>
                                <ul className="dropdown-menu" aria-labelledby="dropdownModulos">
                                    <li><NavLink to='/admin/lesson/create' className="dropdown-item">Crear Lección</NavLink></li>
                                </ul>
                            </li>
                            <li className='nav-item dropdown'>
                                <NavLink exact to='#' className='nav-link dropdown-toggle' id="dropdownModulos" data-bs-toggle="dropdown" aria-expanded="false">Microcontenido</NavLink>
                                <ul className="dropdown-menu" aria-labelledby="dropdownModulos">
                                    <li><NavLink to='/admin/microlerning/create' className="dropdown-item">Crear Microcontenido</NavLink></li>
                                </ul>
                            </li>
                            <li className='nav-item dropdown'>
                                <NavLink exact to='#' className='nav-link dropdown-toggle' id="dropdownModulos" data-bs-toggle="dropdown" aria-expanded="false">Pruebas</NavLink>
                                <ul className="dropdown-menu" aria-labelledby="dropdownModulos">
                                    <li><NavLink to='/admin/test/create' className="dropdown-item">Crear Prueba</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                        <button onClick={auth.logout} className='active'>Cerrar sesión</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavigationAdmin;