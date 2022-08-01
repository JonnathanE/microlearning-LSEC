import { useQuery, useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';
import { getCards, deleteCard } from '../../api/apiCallsAdmin';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Backdrops from '../../components/Backdrops/Backdrops';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Alert from '../../components/Alert/Alert';

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
        <LayoutAdmin>
            <div className='px-10 py-10 flex flex-col'>
                {isFetching && <Backdrops />}
                {error &&
                    <Alert severity='error'>Los datos no se han cargado. Intente de nuevo.</Alert>
                }
                <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <caption className='p-5 text-lg text-center font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800'>Lista de Tarjetas de Aprendizaje</caption>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th className='py-3 px-6'>Pregunta</th>
                                <th className='py-3 px-6'>Lección</th>
                                <th className='py-3 px-6'>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((card, i) => (
                                    <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{card.question}</th>
                                        <td className='py-4 px-6'>{card.lesson ? card.lesson.name : 'No asignado'}</td>
                                        <td className='py-4 px-6 flex flex-row gap-2'>
                                            <button onClick={e => btndeleteCard(card._id, e)} className='px-2 py-2 text-red-700 bg-red-100 dark:bg-red-200 hover:bg-red-200 dark:hover:bg-red-300 dark:text-red-800 dark:hover:text-red-900 rounded-lg cursor-pointer'>Eliminar</button>
                                            <NavLink to={`/admin/card/${card._id}`} className='me-1'>
                                                <button className='px-2 py-2 text-blue-700 bg-green-100 hover:bg-blue-200 rounded-lg dark:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 dark:hover:text-blue-900 cursor-pointer'>Ver más</button>
                                            </NavLink>
                                            <NavLink to={`/admin/card/update/${card._id}`}>
                                                <button className='px-2 py-2 text-green-700 bg-green-100 hover:bg-green-200 rounded-lg dark:bg-green-200 dark:hover:bg-green-300 dark:text-green-800 dark:hover:text-green-900 cursor-pointer'>Modificar</button>
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default ShowCards;