import { useState, useEffect } from 'react';
import { NavLink, useParams, Redirect } from 'react-router-dom';
import { Progress } from 'reactstrap';

import { getLearnContent, addCompleteLearn } from '../api/apiCallsUser';

import { FaAngleRight, FaAngleLeft, FaGraduationCap } from 'react-icons/fa';
import ShowImage from './ShowImage/ShowImage';

import './LearningCapsule.css';

const LearningCapsule = () => {
	const [microlearnings, setMicrolearnings] = useState([]);
	const [content, setContent] = useState({});
	const [count, setCount] = useState(0);
	const [total, setTotal] = useState(0);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [error, setError] = useState(false);

	const { lessonId } = useParams();

	const loadContents = async lessonId => {
		try {
			const res = await getLearnContent(lessonId);
			setMicrolearnings(res);
			setContent(res[0]);
			setTotal(res.length);
		} catch (error) {
			console.log(error.response.data);
			setError(
				'No se ha registrado contenido para esta lección. Vuelve a recargar la página o regresa a la página principal para seguir con las lecciones: '
			);
		}
	};

	const nextContent = () => {
		let iter = count + 1;
		if (iter >= microlearnings.length) iter = microlearnings.length - 1;
		setContent(microlearnings[iter]);
		setCount(iter);
	};

	const backContent = () => {
		let iter = count - 1;
		if (iter < 0) iter = 0;
		setContent(microlearnings[iter]);
		setCount(iter);
	};

	const redirectLearn = () => {
		setRedirectToReferrer(true);
	};

	const redirectLearnFinal = async () => {
		try {
			await addCompleteLearn(lessonId);
			setRedirectToReferrer(true);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	const redirectUser = () => {
		if (redirectToReferrer) {
			return <Redirect to='/learn' />;
		}
	};

	useEffect(() => {
		loadContents(lessonId);
	}, []);

	const progress = () => (
		<>
			<div className='row mt-4 justify-content-center'>
				<div className='col-6'>
					<p className='text-center fw-bold mt-2'>
						{count + 1} de {total}
					</p>
				</div>
			</div>
			<div className='row justify-content-center'>
				<div className='col-1 me-4 bounce-top ps-4'>
					<button
						type='button'
						className='btn-close'
						aria-label='Close'
						onClick={() => redirectLearn()}
					></button>
				</div>
				<div className='col-8 col-md-10 pt-1'>
					<Progress value={count + 1} max={total} />
				</div>
			</div>
		</>
	);

	const capsule = () => (
		<>
			<div className='row justify-content-center'>
				<div className='col-12'>
					<h2>{content.title}</h2>
				</div>
			</div>

			<div className='row'>
				<div className='col-12 col-lg-6 d-flex'>
					<div className='content mx-auto align-self-center'>
						<ShowImage
							styles='my-image img-fluid'
							name={content.title}
							url={content.image_url.url}
						/>
					</div>
				</div>
				<div className='col-12 col-lg-6 d-flex'>
					<div className='content-gif mx-auto align-self-center'>
						<ShowImage
							styles='img-fluid'
							name={content.title}
							url={content.gif_url.url}
						/>
					</div>
				</div>
			</div>

			<div className='row justify-content-center align-items-center mt-5'>
				<div className='col-6 text-center mb-4'>
					{count > 0 && (
						<button
							className='btn btn-danger rounded-pill'
							onClick={() => backContent()}
						>
							<FaAngleLeft /> Atrás
						</button>
					)}

					{count === 0 && (
						<NavLink to='/learn' className='btn btn-danger rounded-pill'>
							<FaGraduationCap /> Lecciones
						</NavLink>
					)}
				</div>

				<div className='col-6 text-center mb-4'>
					{count < total - 1 && (
						<button
							className='btn btn-success rounded-pill'
							onClick={() => nextContent()}
						>
							Siguiente <FaAngleRight />
						</button>
					)}

					{count === total - 1 && (
						<button
							onClick={() => redirectLearnFinal()}
							className='btn btn-danger rounded-pill'
						>
							<FaGraduationCap /> Terminar lección
						</button>
					)}
				</div>
			</div>
		</>
	);

	// show backend error alert
	const showError = () => (
		<div
			className='alert alert-danger align-middle mt-5'
			role='alert'
			style={{ display: error ? '' : 'none' }}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				fill='currentColor'
				className='bi bi-exclamation-triangle-fill flex-shrink-0 me-2'
				viewBox='0 0 16 16'
				role='img'
				aria-label='Warning:'
			>
				<path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
			</svg>
			{error}
			<NavLink to='/learn' className='btn btn-info rounded-pill'>
				<FaGraduationCap /> Lecciones
			</NavLink>
		</div>
	);

	return (
		<>
			<div className='container shadow-drop-center mb-4'>
				{showError()}
				{Object.keys(content).length > 0 && progress()}
				{Object.keys(content).length > 0 && capsule()}
				{redirectUser()}
			</div>
		</>
	);
};

export default LearningCapsule;
