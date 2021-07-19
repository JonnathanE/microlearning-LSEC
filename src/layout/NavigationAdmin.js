import React, { useEffect } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const NavigationAdmin = () => {

    const auth = useAuth();

    return (
        <>
            {/* Navbar Principal */}
            <nav className='navbar sticky-top navbar-expand-sm navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <NavLink exact to='/admin/dashboard' className='navbar-brand'>PANEL ADMIN</NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className='navbar-nav m-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <NavLink exact to='/admin/modulos' className='nav-link'>Modulos</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink exact to='/admin/modulos' className='nav-link'>Lecciones</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink exact to='/admin/modulos' className='nav-link'>Microcontnido</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink exact to='/admin/modulos' className='nav-link'>Pruebas</NavLink>
                            </li>
                            <li className='Navbar text with an inline element'>
                                <button onClick={auth.logout} className='active'>Cerrar sesión</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavigationAdmin;