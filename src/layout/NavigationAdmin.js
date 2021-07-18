import React, { useEffect } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const NavigationAdmin = () => {

    const auth = useAuth();

    return (
        <>
            <nav>
                <button onClick={auth.logout}>Cerrar sesión</button>
            </nav>
        </>
    )
}

export default NavigationAdmin;