import { useQuery, useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';
import { getModules, deleteModule } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ShowModules = () => {
	const queryClient = useQueryClient();

	const { data, error, isFetching } = useQuery(['modules'], getModules);

	const MySwal = withReactContent(Swal);

	const btndeleteModule = moduleId => {
		MySwal.fire({
			title: '¿Estas seguro?',
			text: '¡No podrás revertir esto!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: '¡Sí, bórralo!',
		}).then(async result => {
			if (result.isConfirmed) {
				try {
					await deleteModule(moduleId);
					queryClient.invalidateQueries('modules');
					Swal.fire('¡Eliminado!', 'Su archivo ha sido eliminado', 'success');
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'No se pudo eliminar el módulo',
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
						Lista de Modulos
					</caption>
					<thead className='table-dark'>
						<tr>
							<th className='text-center'># Modulo</th>
							<th className='text-center'>Nombre</th>
							<th className='text-center'>Opciones</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((module, i) => (
								<tr key={i}>
									<th>{module.number}</th>
									<td>{module.name}</td>
									<td>
										<button
											onClick={e => btndeleteModule(module._id, e)}
											className='btn btn-danger me-1'
										>
											Eliminar
										</button>
										<NavLink to={`/admin/module/update/${module._id}`}>
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

export default ShowModules;
