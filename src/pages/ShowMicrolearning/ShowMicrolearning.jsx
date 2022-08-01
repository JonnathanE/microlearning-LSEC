import { useQuery, useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';
import { getMicrolearnings, deleteMicrolearning } from '../../api/apiCallsAdmin';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Backdrops from '../../components/Backdrops/Backdrops';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Alert from '../../components/Alert/Alert';
import tw from 'twin.macro';
import ShowImage from '../../components/ShowImage/ShowImage';

const TableWrapper = tw.div`
overflow-x-auto relative shadow-md sm:rounded-lg
`;

const Table = tw.table`
w-full text-sm text-left text-gray-500 dark:text-gray-400
`;

const Thead = tw.thead`
text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400
`;

const ThHead = tw.th`
py-3 px-6
`;
const ThBody = tw.th`
py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white
`;

const Tr = tw.tr`
bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
`;

const Td = tw.td`
py-4 px-6
`;

const TdImage = tw.td`
flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white
`;

const ShowMicrolearning = () => {

    const queryClient = useQueryClient();

    const { data, error, isFetching } = useQuery(["microlearnings"], getMicrolearnings);

    const MySwal = withReactContent(Swal);

    const btndeleteMicrolearning = (microId) => {
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
                    await deleteMicrolearning(microId);
                    queryClient.invalidateQueries("microlearnings");
                    Swal.fire('¡Eliminado!', 'Su archivo ha sido eliminado', 'success')
                } catch (error) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hubo un error al eliminar el microcontenido. Intente de nuevo.'
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
                <TableWrapper>
                    <Table>
                        <caption className='p-5 text-lg text-center font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800'>Lista de Cápsulas de Aprendizaje</caption>
                        <Thead>
                            <tr>
                                <ThHead>ID</ThHead>
                                <ThHead>Nombre</ThHead>
                                <ThHead>Lección</ThHead>
                                <ThHead>Opciones</ThHead>
                            </tr>
                        </Thead>
                        <tbody>
                            {data &&
                                data.map((micro, i) => (
                                    <Tr key={i}>
                                        <ThBody>
                                            {micro._id}
                                        </ThBody>
                                        <TdImage>
                                            <ShowImage
                                                styles="w-10 h-10 rounded-full" url={micro.image_url?.url}
                                                name="Cápsula de aprendizaje"
                                                styleLazy='w-10 h-10 bg-gray-300 flex flex-col items-center justify-center object-cover'
                                            />
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{micro.title}</div>
                                                <div className="font-normal text-gray-500">{micro.lesson ? micro.lesson.name : 'No asignado'}</div>
                                            </div>
                                        </TdImage>
                                        <Td>
                                            {micro.lesson ? micro.lesson.name : 'No asignado'}
                                        </Td>
                                        <td className='py-4 px-6 flex flex-row gap-2'>
                                            <button onClick={(e) => btndeleteMicrolearning(micro._id, e)} className='px-2 py-2 text-red-700 bg-red-100 dark:bg-red-200 hover:bg-red-200 dark:hover:bg-red-300 dark:text-red-800 dark:hover:text-red-900 rounded-lg cursor-pointer'>
                                                Eliminar
                                            </button>
                                            <NavLink to={`/admin/micro/${micro._id}`} className='me-1'>
                                                <button className='px-2 py-2 text-blue-700 bg-green-100 hover:bg-blue-200 rounded-lg dark:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 dark:hover:text-blue-900 cursor-pointer'>Ver más</button>
                                            </NavLink>
                                            <NavLink to={`/admin/micro/update/${micro._id}`}>
                                                <button className='px-2 py-2 text-green-700 bg-green-100 hover:bg-green-200 rounded-lg dark:bg-green-200 dark:hover:bg-green-300 dark:text-green-800 dark:hover:text-green-900 cursor-pointer'>Modificar</button>
                                            </NavLink>
                                        </td>
                                    </Tr>
                                ))}
                        </tbody>
                    </Table>
                </TableWrapper>
            </div>
        </LayoutAdmin>
    )
}

export default ShowMicrolearning;