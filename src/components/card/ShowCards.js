import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../../layout/NavigationAdmin';
import { getCards, deleteMicrolearning } from '../../core/apiCore';
import { NavLink } from 'react-router-dom';
import useAuth from '../../auth/useAuth';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ShowCards = () => {
    // state
    const [cards, setCards] = useState([]);

    const auth = useAuth();

    const MySwal = withReactContent(Swal);

    const loadCards = () => {
        getCards().then(data => {
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            } else {
                setCards(data);
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
                            //loadMicrolearning();
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
        loadCards();
    }, [])

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                <table className='table table-striped table-hover caption-top table-responsive align-middle'>
                    <caption className='text-center fw-bold fs-2 text-wrap'>Lista de Pruebas</caption>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center'>Pregunta</th>
                            <th className='text-center'>Lección</th>
                            <th className='text-center'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map((card, i) => (
                            <tr key={i}>
                                <td>{card.question}</td>
                                <th>{card.lesson ? card.lesson.name : 'No asignado'}</th>
                                <td>
                                    <button onClick={(e) => btndeleteMicrolearning(card._id, e)} className='btn btn-danger me-1'>Eliminar</button>
                                    <NavLink to={`/admin/card/${card._id}`} className='me-1'>
                                        <button className='btn btn-primary'>Ver más</button>
                                    </NavLink>
                                    <NavLink to={`/admin/card/update/${card._id}`}>
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

export default ShowCards;