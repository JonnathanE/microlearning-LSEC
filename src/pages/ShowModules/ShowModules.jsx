import { useQuery, useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';
import { getModules, deleteModule } from '../../api/apiCallsAdmin';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Backdrops from '../../components/Backdrops/Backdrops';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Alert from '../../components/Alert/Alert';

const ShowModules = () => {

    const queryClient = useQueryClient();

    const { data, error, isFetching } = useQuery(["modules"], getModules, { refetchOnWindowFocus: false });

    const MySwal = withReactContent(Swal);

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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteModule(moduleId);
                    queryClient.invalidateQueries("modules");
                    Swal.fire(
                        '¡Eliminado!',
                        'Su archivo ha sido eliminado',
                        'success'
                    )
                } catch (error) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo eliminar el módulo'
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
                        <caption className='p-5 text-lg text-center font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800'>Lista de Módulos</caption>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th className='py-3 px-6'># Modulo</th>
                                <th className='py-3 px-6'>Nombre</th>
                                <th className='py-3 px-6'>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((module, i) => (
                                    <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            {module.number}
                                        </th>
                                        <td className='py-4 px-6'>
                                            {module.name}
                                        </td>
                                        <td className='py-4 px-6 flex flex-row gap-2'>
                                            <button onClick={(e) => btndeleteModule(module._id, e)} className='px-2 py-2 text-red-700 bg-red-100 dark:bg-red-200 hover:bg-red-200 dark:hover:bg-red-300 dark:text-red-800 dark:hover:text-red-900 rounded-lg cursor-pointer'>
                                                Eliminar
                                            </button>
                                            <NavLink to={`/admin/module/update/${module._id}`}>
                                                <button className='px-2 py-2 text-green-700 bg-green-100 hover:bg-green-200 rounded-lg dark:bg-green-200 dark:hover:bg-green-300 dark:text-green-800 dark:hover:text-green-900 cursor-pointer'>Modificar</button>
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default ShowModules;