import { useQuery, useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';
import { getCards, deleteCard } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const ShowCards = () => {
    const queryClient = useQueryClient();

    const { data, error, isFetching } = useQuery(["cards"], getCards);

    const MySwal = withReactContent(Swal);

    const btndeleteCard = (cardId) => {
        MySwal.fire({
            title: '¿Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCard(cardId);
                    queryClient.invalidateQueries("cards");
                    Swal.fire('¡Eliminado!', 'Su archivo ha sido eliminado', 'success')
                } catch (error) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hubo un error al eliminar la Carta de conocimiento. Intente de nuevo'
                    })
                }
            }
        })
    }

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                {isFetching && <Spinner />}

                {error && <div class="alert alert-warning" role="alert">
                    Los datos no se han cargado. Intente de nuevo.
                </div>}

                <table className='table table-striped table-hover caption-top table-responsive align-middle text-center'>
                    <caption className='text-center fw-bold fs-2 text-wrap'>Lista de Pruebas</caption>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center'>Pregunta</th>
                            <th className='text-center'>Lección</th>
                            <th className='text-center'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((card, i) => (
                                <tr key={i}>
                                    <td>{card.question}</td>
                                    <th>{card.lesson ? card.lesson.name : 'No asignado'}</th>
                                    <td>
                                        <button onClick={e => btndeleteCard(card._id, e)} className='btn btn-danger me-1'>Eliminar</button>
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