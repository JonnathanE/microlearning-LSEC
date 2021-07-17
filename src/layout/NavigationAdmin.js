import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavigationAdmin = () => {

    return (
        <>
            <nav className='grey darken-1'>
                <div className="nav-wrappe">
                    <Link className="brand-logo" to="/admin/panel">
                        Inicio Admin
                    </Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html">Agregar módulo</a></li>
                        <li><a href="badges.html">Agregar lecciones</a></li>

                        <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Usuario<i className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                </div>
            </nav>
            <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">Perfil</a></li>
                <li className="divider"></li>
                <li><a href="#!">Cerrar Sesión</a></li>
            </ul>
            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>

        </>
    )
}

export default NavigationAdmin;