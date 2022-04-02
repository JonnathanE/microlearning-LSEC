import { useQuery, useQueryClient } from 'react-query';
import { getLessons, deleteLesson } from '../../api/apiCallsAdmin';
import { NavLink } from 'react-router-dom';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ShowLessons = () => {
	const queryClient = useQueryClient();

	const MySwal = withReactContent(Swal);

	const { data, error, isFetching } = useQuery(['lessons'], getLessons);

	const btndeleteLesson = lessonId => {
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
					await deleteLesson(lessonId);
					queryClient.invalidateQueries('lessons');
					Swal.fire('¡Eliminado!', 'Su archivo ha sido eliminado', 'success');
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Hubo un error al eliminar la lección.',
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
						Lista de Lecciones
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
							data.map((lesson, i) => (
								<tr key={i}>
									<th>
										{lesson.module ? lesson.module.number : 'No asignado'}
									</th>
									<td>{lesson.name}</td>
									<td>
										<button
											onClick={e => btndeleteLesson(lesson._id, e)}
											className='btn btn-danger me-1'
										>
											Eliminar
										</button>
										<NavLink
											to={`/admin/lesson/${lesson._id}`}
											className='me-1'
										>
											<button className='btn btn-primary'>Ver más</button>
										</NavLink>
										<NavLink to={`/admin/lesson/update/${lesson._id}`}>
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

export default ShowLessons;
