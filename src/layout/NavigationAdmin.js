import React, { useEffect } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const NavigationAdmin = () => {

    const auth = useAuth();

    useEffect(() => {
        const M = window.M;
        let sidenav = document.querySelectorAll('.sidenav');
        M.Sidenav.init(sidenav);
        let dropdownUser = document.querySelector('.dropdown');
        M.Dropdown.init(dropdownUser, {});
        let dropdownU = document.querySelector('.dropdown-trigger');
        M.Dropdown.init(dropdownU, {});
    })

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <NavLink exact to='/admin/dashboard' className="brand-logo">Inicio</NavLink>
                    <ul class="right hide-on-med-and-down">
                        <li><button onClick={auth.logout}>Cerrar sesión</button></li>
                        <li><a className="dropdown-trigger" href="#!" data-target="name_target2">Dropdown<i enter code here className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                </div>
            </nav>
            <ul id="name_target2" className="dropdown-content">
                <li><a href="#!">Perfil</a></li>
                <li className="divider"></li>
                <li><button onClick={auth.logout}>Cerrar sesión</button></li>
            </ul>
        </>
    )
}

export default NavigationAdmin;