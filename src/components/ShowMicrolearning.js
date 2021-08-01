import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../layout/NavigationAdmin';
import { getMicrolearnings, deleteMicrolearning } from '../core/apiCore';
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
                setMicrolearning(data);
            }
        });
    }

    const btndeleteMicrolearning = (microId) => {
        MySwal.fire({
            title: '¿Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMicrolearning(microId, auth.user.token)
                    .then(data => {
                        if (data.error) {
                            MySwal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: data.error
                            })
                        } else {
                            loadMicrolearning();
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
                                <th>{micro.lesson ? micro.lesson.name : 'No asignado'}</th>
                                <td>
                                    <button onClick={(e) => btndeleteMicrolearning(micro._id, e)} className='btn btn-danger me-1'>Eliminar</button>
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