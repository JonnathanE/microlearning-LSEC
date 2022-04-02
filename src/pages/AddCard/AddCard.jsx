import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { getLessons, addCard } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AddCard = () => {
	const [lessons, setLessons] = useState([]);
	const [formData, setFormData] = useState('');
	const [loading, setLoading] = useState(false);

	const MySwal = withReactContent(Swal);

	// yup schema to validate inputs
	const schema = yup.object().shape({
		question: yup.string().required('El nombre de la lección es requerido'),
		lesson: yup.string().ensure().required('Debe de elegir un módulo'),
		correctAnswer: yup
			.string()
			.ensure()
			.required('La respuesta correcta es requerido'),
		wrongAnswer: yup
			.string()
			.ensure()
			.required('La respuesta incorrecta es requerido'),
		gif: yup.mixed().test('fileSize', 'El gif debe ser 9 MB', value => {
			if (value.length === 0) return false;
			return value[0].size <= 9000000;
		}),
	});

	// initialize the React Hook Form methods
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// submit method
	const clickSubmit = async data => {
		setLoading(true);
		formData.append('question', data.question);
		formData.append('lesson', data.lesson);
		formData.append('correctAnswer', data.correctAnswer);
		formData.append('wrongAnswer', data.wrongAnswer);
		formData.append('gif', data.gif[0]);
		try {
			await addCard(formData);
			setLoading(false);
			MySwal.fire('¡Prueba creado con éxito!', '', 'success');
			reset({
				question: '',
				lesson: 'Selecciona una lección',
				correctAnswer: '',
				wrongAnswer: '',
				gif: '',
			});
		} catch (error) {
			setLoading(false);
			MySwal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.response.data.error,
			});
		}
	};

	const loadLessons = async () => {
		try {
			const res = await getLessons();
			setLessons(res);
		} catch (error) {
			MySwal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.response.data.error,
			});
		}
	};

	useEffect(() => {
		loadLessons();
		setFormData(new FormData());
	}, []);

	// shows the validation error of the inputs
	const errorValidator = messageError => (
		<p style={{ color: '#ff0000' }}>{messageError}</p>
	);

	// form structure
	const signInForm = () => (
		<form onSubmit={handleSubmit(clickSubmit)}>
			<div className='form-group'>
				<label className='text-muted'>Pregunta</label>
				<input type='text' {...register('question')} className='form-control' />
				{errors.question && errorValidator(errors.question.message)}
			</div>
			<div className='form-group'>
				<label className='text-muted'>Lección</label>
				<select type='text' {...register('lesson')} className='form-select'>
					<option value=''>Selecciona una Lección</option>
					{lessons &&
						lessons.map((c, i) => (
							<option key={i} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
				{errors.lesson && errorValidator(errors.lesson.message)}
			</div>
			<div className='form-group'>
				<label className='text-muted'>Restpuesta correcta</label>
				<input
					type='text'
					{...register('correctAnswer')}
					className='form-control'
				/>
				{errors.correctAnswer && errorValidator(errors.correctAnswer.message)}
			</div>
			<div className='form-group'>
				<label className='text-muted'>Respuesta incorrecta</label>
				<input
					type='text'
					{...register('wrongAnswer')}
					className='form-control'
				/>
				{errors.wrongAnswer && errorValidator(errors.wrongAnswer.message)}
			</div>
			<div className='form-group mb-3'>
				<label className='form-label' htmlFor='gifFile'>
					Gif
				</label>
				<input
					type='file'
					accept='image/*'
					{...register('gif')}
					id='gifFile'
					className='form-control'
				/>
				{errors.gif && errorValidator(errors.gif.message)}
			</div>
			<NavLink to='/admin/dashboard'>
				<button type='button' className='btn btn-danger ms-4 me-4'>
					Regresar
				</button>
			</NavLink>
			<input type='submit' className='btn btn-primary' />
		</form>
	);

	// shows loading when submit is executing
	const showLoading = () => loading && <Spinner />;

	return (
		<>
			<NavigationAdmin />
			<div className='container'>
				<div className='row'>
					<div className='col-md-4 mx-auto mt-5'>
						<div className='myform form shadow p-3 mb-5 bg-body rounded'>
							<div className='logo mb-3'>
								<div className='col-md-12 text-center'>
									<h1>Crear Prueba</h1>
								</div>
							</div>
							{showLoading()}
							{signInForm()}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddCard;
