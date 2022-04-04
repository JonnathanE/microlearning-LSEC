import { useQuery } from 'react-query';
import { getUsers } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Backdrops from '../../components/Backdrops/Backdrops';

const Showusers = () => {

    const { data, error, isFetching } = useQuery(["modules"], getUsers);

    return (
        <>
            <NavigationAdmin />
            <div className='container'>

                {isFetching && <Backdrops />}

                {error && <div class="alert alert-warning" role="alert">
                    Los datos no se han cargado. Intente de nuevo.
                </div>}

                <table className='table table-striped table-hover caption-top table-responsive align-middle text-center'>
                    <caption className='text-center fw-bold fs-2 text-wrap'>Lista de Usuarios</caption>
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
