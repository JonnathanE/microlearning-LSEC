import { useQuery, useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';
import {
	getMicrolearnings,
	deleteMicrolearning,
} from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ShowMicrolearning = () => {
	const queryClient = useQueryClient();

	const { data, error, isFetching } = useQuery(
		['microlearnings'],
		getMicrolearnings
	);

	const MySwal = withReactContent(Swal);

	const btndeleteMicrolearning = microId => {
		MySwal.fire({
			title: '¿Estas seguro?',
			text: '¡No podrás revertir esto!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Sí, bórralo!',
		}).then(async result => {
			if (result.isConfirmed) {
				try {
					await deleteMicrolearning(microId);
					queryClient.invalidateQueries('microlearnings');
					Swal.fire('¡Eliminado!', 'Su archivo ha sido eliminado', 'success');
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Hubo un error al eliminar el microcontenido. Intente de nuevo.',
					});
				}
			}
		});
	};

	return (
		<>
			<NavigationAdmin />
			<div className='container'>
				{isFetching && <Spinner />}

				{error && (
					<div className='alert alert-warning' role='alert'>
						Los datos no se han cargado. Intente de nuevo.
					</div>
				)}

				<table className='table table-striped table-hover caption-top table-responsive align-middle text-center'>
					<caption className='text-center fw-bold fs-2 text-wrap'>
						Lista de Mocrocontenido
					</caption>
					<thead className='table-dark'>
						<tr>
							<th className='text-center'>Nombre</th>
							<th className='text-center'>Lección</th>
							<th className='text-center'>Opciones</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((micro, i) => (
								<tr key={i}>
									<td>{micro.title}</td>
									<th>{micro.lesson ? micro.lesson.name : 'No asignado'}</th>
									<td>
										<button
											onClick={e => btndeleteMicrolearning(micro._id, e)}
											className='btn btn-danger me-1'
										>
											Eliminar
										</button>
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
	);
};

export default ShowMicrolearning;
