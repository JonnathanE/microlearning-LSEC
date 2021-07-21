import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../layout/NavigationAdmin';
import { getLessons, deleteLesson } from '../core/apiCore';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ShowLessons = () => {

    // state
    const [lessons, setLessons] = useState([]);

    const auth = useAuth();

    const MySwal = withReactContent(Swal);

    const loadLessons = () => {
        getLessons().then(data => {
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            } else {
                setLessons(data);
            }
        });
    }

    const btndeleteLesson = (lessonId) => {
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
                deleteLesson(lessonId, auth.user.token)
                    .then(data => {
                        if (data.error) {
                            MySwal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: data.error
                            })
                        } else {
                            loadLessons();
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
        loadLessons();
    }, [])

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                <table className='table table-striped table-hover caption-top table-responsive align-middle'>
                    <caption className='text-center fw-bold fs-2 text-wrap'>Lista de Lecciones</caption>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center'># Modulo</th>
                            <th className='text-center'>Nombre</th>
                            <th className='text-center'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((lesson, i) => (
                            <tr key={i}>
                                <th>{lesson.module.number}</th>
                                <td>{lesson.name}</td>
                                <td>
                                    <button onClick={(e) => btndeleteLesson(lesson._id, e)} className='btn btn-danger me-1'>Eliminar</button>
                                    <NavLink to={`/admin/lesson/${lesson._id}`} className='me-1'>
                                        <button className='btn btn-primary'>Ver más</button>
                                    </NavLink>
                                    <NavLink to={`/admin/lesson/update/${lesson._id}`}>
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

export default ShowLessons;