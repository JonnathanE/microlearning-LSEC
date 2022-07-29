import useAuth from '../../auth/useAuth';
import { NavLink } from 'react-router-dom';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';

import { FaTable, FaListAlt, FaListUl, FaList, FaPlus } from "react-icons/fa";

const DashBoard = () => {
    const auth = useAuth();

    const original = () => (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-4 mb-4 text-center'><h3>Bienvenido {auth?.user.name} </h3></div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Módulos</li>
                            <ul className='list-group list-group-flush' data-testid="nav-admin-list-module">
                                <NavLink to='/admin/showmodules' className='list-group-item'><FaTable /> Listar módulos</NavLink>
                                <NavLink to='/admin/module/create' className='list-group-item'><FaPlus /> Crear módulo</NavLink>
                            </ul>
                        </ul>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Lecciones</li>
                            <ul className='list-group list-group-flush' data-testid="nav-admin-list-lesson">
                                <NavLink to='/admin/showlessons' className='list-group-item'><FaListAlt /> Listar lecciones</NavLink>
                                <NavLink to='/admin/lesson/create' className='list-group-item'><FaPlus /> Crear lecciones</NavLink>
                            </ul>
                        </ul>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Cápsulas de Aprendizaje</li>
                            <ul className='list-group list-group-flush' data-testid="nav-admin-list-micro">
                                <NavLink to='/admin/showmicrolearnings' className='list-group-item'><FaListUl /> Listar Cápsulas de Aprendizaje</NavLink>
                                <NavLink to='/admin/micro/create' className='list-group-item'><FaPlus /> Crear Cápsulas de Aprendizaje</NavLink>
                            </ul>
                        </ul>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Tarjetas de Aprendizaje</li>
                            <ul className='list-group list-group-flush' data-testid="nav-admin-list-card">
                                <NavLink to='/admin/showcards' className='list-group-item'><FaList /> Listar Tarjetas de Aprendizaje</NavLink>
                                <NavLink to='/admin/card/create' className='list-group-item'><FaPlus /> Crear Tarjetsa de Aprendizaje</NavLink>
                            </ul>
                        </ul>
                        <ul>
                            <li className='fw-bold bg-info text-dark'>Gestión de Usuarios</li>
                            <ul className='list-group list-group-flush'>
                                <NavLink to='/admin/showusers' className='list-group-item'><FaList /> Listar Usuarios</NavLink>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <LayoutAdmin>
            <div className='px-10'>
                {original()}
            </div>
        </LayoutAdmin>
    )
}

export default DashBoard;