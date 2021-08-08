import React from 'react';
import NavigationAdmin from './NavigationAdmin';
import useAuth from '../auth/useAuth';
import { NavLink } from 'react-router-dom';

import { FaTable, FaListAlt, FaListUl, FaList, FaPlus } from "react-icons/fa";

const DashBoard = (req, res) => {
    const auth = useAuth();
    return (
        <>
            <NavigationAdmin />
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-4 mb-4 text-center'><h3>Bienvenido {auth.user.user.name} </h3></div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Módulos</li>
                            <ul className='list-group list-group-flush'>
                                <NavLink to='/admin/showmodules' className='list-group-item'><FaTable/> Listar módulos</NavLink>
                                <NavLink to='/admin/module/create' className='list-group-item'><FaPlus/> Crear módulo</NavLink>
                            </ul>
                        </ul>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Lecciones</li>
                            <ul className='list-group list-group-flush'>
                                <NavLink to='/admin/showlessons' className='list-group-item'><FaListAlt/> Listar lecciones</NavLink>
                                <NavLink to='/admin/lesson/create' className='list-group-item'><FaPlus/> Crear lecciones</NavLink>
                            </ul>
                        </ul>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Microcontenido</li>
                            <ul className='list-group list-group-flush'>
                                <NavLink to='/admin/showmicrolearnings' className='list-group-item'><FaListUl/> Listar microcontenido</NavLink>
                                <NavLink to='/admin/micro/create' className='list-group-item'><FaPlus/> Crear microcontenido</NavLink>
                            </ul>
                        </ul>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Pruebas</li>
                            <ul className='list-group list-group-flush'>
                                <NavLink to='/admin/showcards' className='list-group-item'><FaList/> Listar pruebas</NavLink>
                                <NavLink to='/admin/card/create' className='list-group-item'><FaPlus/> Crear pruebas</NavLink>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard;