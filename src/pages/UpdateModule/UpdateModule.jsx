import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useParams } from 'react-router-dom';
import { updateModule, getModuleById } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UpdateModule = () => {
	const [module, setModule] = useState({});
	const [loading, setLoading] = useState(false);

	// get param moduleId for url
	const { moduleId } = useParams();

	const MySwal = withReactContent(Swal);

	// yup schema to validate inputs
	const schema = yup.object().shape({
		number: yup
			.number()
			.positive()
			.integer()
			.required('Debe de ingresar el número de módulo'),
		name: yup
			.string()
			.required('Requiere que ingrese un nombre para el módulo'),
	});

	// initialize the React Hook Form methods
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// load moduel for API
	const loadSingleModule = async moduelId => {
		try {
			const res = await getModuleById(moduelId);
			setModule(res);
		} catch (error) {
			MySwal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Lo sentimos, no se pudieron encontrar los datos',
			});
		}
	};

	useEffect(() => {
		loadSingleModule(moduleId);
	}, []);

	// submit method
	const clickSubmit = data => {
		setLoading(false);
		MySwal.fire({
			title: <p>¿Quieres guardar los cambios?</p>,
			showCancelButton: true,
			confirmButtonText: `Guardar cambios`,
		}).then(async result => {
			if (result.isConfirmed) {
				setLoading(true);
				try {
					await updateModule(module._id, data);
					setLoading(false);
					MySwal.fire('¡Módulo actualizado con éxito!', '', 'success');
				} catch (error) {
					setLoading(false);
					MySwal.fire('¡Gurdado!', '', 'success');
					loadSingleModule(moduleId);
				}
			}
		});
	};

	// shows the validation error of the inputs
	const errorValidator = messageError => (
		<p style={{ color: '#ff0000' }}>{messageError}</p>
	);

	// form structure
	const signInForm = () => (
		<form className='sign-box' onSubmit={handleSubmit(clickSubmit)}>
			<div className='form-group mb-4'>
				<label className='text-muted'>Número de módulo</label>
				<input
					type='number'
					{...register('number')}
					defaultValue={module.number}
					className='form-control'
					min={0}
				/>
				{errors.number && errorValidator(errors.number.message)}
			</div>
			<div className='form-group mb-4'>
				<label className='text-muted'>Nombre</label>
				<input
					type='text'
					{...register('name')}
					defaultValue={module.name}
					className='form-control'
				/>
				{errors.name && errorValidator(errors.name.message)}
			</div>
			<div className='row'>
				<div className='col-6 col-md-6'>
					<NavLink to='/admin/showmodules'>
						<button type='button' className='btn btn-danger ms-4 me-4'>
							Regresar
						</button>
					</NavLink>
				</div>
				<div className='col-6 col-md-6'>
					<input type='submit' className='btn btn-primary' value='Actualizar' />
				</div>
			</div>
		</form>
	);

	// shows loading when submit is executing
	const showLoading = () => loading && <Spinner />;

	return (
		<>
			<NavigationAdmin />
			<div className='container'>
				<div className='row'>
					<h2 className='text-center mt-2'>
						Modificar el módulo {module.name}
					</h2>
				</div>
				<div className='row'>
					{showLoading()}
					{signInForm()}
				</div>
			</div>
		</>
	);
};

export default UpdateModule;
