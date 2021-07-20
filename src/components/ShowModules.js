import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../layout/NavigationAdmin';
import { getModules } from '../core/apiCore';
import { NavLink } from 'react-router-dom';

const ShowModules = () => {

    // state
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(false);

    const loadModules = () => {
        getModules().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setModules(data);
            }
        });
    }

    const deleteModule = (id) => {
        alert(id)
    }

    useEffect(() => {
        loadModules();
    }, [])

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                <table className='table table-striped table-hover caption-top table-responsive align-middle'>
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
                                    <button onClick={(e) => deleteModule(module._id, e)} className='btn btn-danger me-1'>Eliminar</button>
                                    <NavLink to={`/module/${module._id}`}>
                                        <button className='btn btn-info me-1'>Ver</button>
                                    </NavLink>
                                    <NavLink to={`/module/update/${module._id}`}>
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