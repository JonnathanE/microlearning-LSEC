import { useQuery, useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';
import { getUsers } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const Showusers = () => {

    const queryClient = useQueryClient();

    const { data, error, isFetching } = useQuery(["modules"], getUsers);

    const MySwal = withReactContent(Swal);

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                {isFetching && <Spinner />}

                {error && <div class="alert alert-warning" role="alert">
                    Los datos no se han cargado. Intente de nuevo.
                </div>}

                <table className='table table-striped table-hover caption-top table-responsive align-middle text-center'>
                    <caption className='text-center fw-bold fs-2 text-wrap'>Lista de Modulos</caption>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center'>id</th>
                            <th className='text-center'>Nombre</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((user, i) => (
                                <tr key={i}>
                                    <th>{user._id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roles?.map(rol => (
                                        <span key={rol._id} className='me-3'>{rol.name}</span>
                                    ))}</td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Showusers;
