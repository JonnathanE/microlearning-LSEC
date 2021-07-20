import React from 'react';
import NavigationAdmin from './NavigationAdmin';
import useAuth from '../auth/useAuth';
import { NavLink } from 'react-router-dom';

const DashBoard = (req, res) => {
    const auth = useAuth();
    return (
        <>
            <NavigationAdmin />
            <div className='container'>
                <div className='row'>
                    <h3> Bienvenido {auth.user.user.name} </h3>
                </div>
                <div className='row'>
                    <ul>
                        <li><NavLink to='/admin/showmodules'>Listar modulos</NavLink> </li>
                    </ul>
                    <ul>
                        <li><NavLink to='/admin/signin'>Listar lecciones</NavLink> </li>
                    </ul>
                    <ul>
                        <li><NavLink to='/admin/signin'>Listar microcontenido</NavLink> </li>
                    </ul>
                    <ul>
                        <li><NavLink to='/admin/signin'>Listar pruebas</NavLink> </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DashBoard;