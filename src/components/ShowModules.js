import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../layout/NavigationAdmin';
import { getModules, deleteModule } from '../core/apiCore';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ShowModules = () => {

    // state
    const [modules, setModules] = useState([]);

    const auth = useAuth();

    const MySwal = withReactContent(Swal);

    const loadModules = () => {
        getModules().then(data => {
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            } else {
                setModules(data);
            }
        });
    }

    const btndeleteModule = (moduleId) => {
        MySwal.fire({
            title: '¿Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteModule(moduleId, auth.user.token)
                    .then(data => {
                        if (data.error) {
                            MySwal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: data.error
                            })
                        } else {
                            loadModules();
                            Swal.fire(
                                '¡Eliminado!',
                                'Su archivo ha sido eliminado',
                                'success'
                            )
                        }
                    });
            }
        })
    }

    useEffect(() => {
        loadModules();
    }, [])

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                <table className='table table-striped table-hover caption-top table-responsive align-middle text-center'>
                    <caption className='text-center fw-bold fs-2 text-wrap'>Lista de Modulos</caption>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center'># Modulo</th>
                            <th className='text-center'>Nombre</th>
                            <th className='text-center'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules.map((module, i) => (
                            <tr key={i}>
                                <th>{module.number}</th>
                                <td>{module.name}</td>
                                <td>
                                    <button onClick={(e) => btndeleteModule(module._id, e)} className='btn btn-danger me-1'>Eliminar</button>
                                    <NavLink to={`/admin/module/update/${module._id}`}>
                                        <button className='btn btn-success'>Modificar</button>
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShowModules;