import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../layout/NavigationAdmin';
import { getMicrolearnings, readLesson } from '../core/apiCore';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ShowMicrolearning = () => {
     // state
    const [microlearning, setMicrolearning] = useState([]);

    const auth = useAuth();

    const MySwal = withReactContent(Swal);

    const loadMicrolearning = () => {
        getMicrolearnings().then(data => {
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            } else {
                console.log(data)
                setMicrolearning(data);
            }
        });
    }

    useEffect(() => {
        loadMicrolearning();
    }, [])

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                <table className='table table-striped table-hover caption-top table-responsive align-middle'>
                    <caption className='text-center fw-bold fs-2 text-wrap'>Lista de Mocrocontenido</caption>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center'>Nombre</th>
                            <th className='text-center'>Lección</th>
                            <th className='text-center'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {microlearning.map((micro, i) => (
                            <tr key={i}>
                                <td>{micro.title}</td>
                                <th>{micro.lesson? micro.lesson.name : 'No asignado'}</th>
                                <td>
                                    
                                    <NavLink to={`/admin/micro/${micro._id}`} className='me-1'>
                                        <button className='btn btn-primary'>Ver más</button>
                                    </NavLink>
                                    <NavLink to={`/admin/micro/update/${micro._id}`}>
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

export default ShowMicrolearning;