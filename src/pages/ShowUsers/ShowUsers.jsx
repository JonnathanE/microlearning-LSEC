import { useQuery } from 'react-query';
import { getUsers } from '../../api/apiCallsAdmin';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Alert from '../../components/Alert/Alert';
import Backdrops from '../../components/Backdrops/Backdrops';
import tw, { styled } from 'twin.macro';
import avatar from '../../img/user-avatar.png';

const SpanRol = styled.span`
    ${tw`
            font-bold
        `
    }
    ${({ rol }) => rol === 'student' ? tw`text-blue-800` : tw``}
    ${({ rol }) => rol === 'moderator' ? tw`text-yellow-500` : tw``}
    ${({ rol }) => rol === 'admin' ? tw`text-green-800` : tw``}
`;

const Showusers = () => {

    const { data, error, isFetching } = useQuery(["modules"], getUsers);

    return (
        <LayoutAdmin>
            <div className='px-10 py-10 flex flex-col'>

                {isFetching && <Backdrops />}

                {error &&
                    <Alert severity='error'>Los datos no se han cargado. Intente de nuevo.</Alert>
                }

                <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <caption className='p-5 text-lg text-center font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800'>Lista de Usuarios</caption>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th className='py-3 px-6'>id</th>
                                <th className='py-3 px-6'>Nombre</th>
                                <th className='py-3 px-6'>Email</th>
                                <th className='py-3 px-6'>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((user, i) => (
                                    <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            {user._id}
                                        </th>
                                        <td className='flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white'>
                                            <img className="w-10 h-10 rounded-full" src={avatar} alt="Avatar" />
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{user.name}</div>
                                                <div className="font-normal text-gray-500">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className='py-4 px-6'>
                                            {user.email}
                                        </td>
                                        <td className='py-4 px-6 flex flex-row gap-2'>
                                            {user.roles?.map(rol => (
                                                <SpanRol key={rol._id} rol={rol.name}>{rol.name}</SpanRol>
                                            ))}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutAdmin>
    );
}

export default Showusers;
