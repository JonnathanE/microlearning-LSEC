import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getCardById } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import ShowImage from '../../components/ShowImage/ShowImage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './viewKnowledgeCard.css';

const ViewKnowledgeCard = () => {
	const [card, setCard] = useState({});
	const [lesson, setLesson] = useState({});

	// get param moduleId for url
	const { cardId } = useParams();

	const MySwal = withReactContent(Swal);

	const loadSingleCard = async cardId => {
		try {
			const res = await getCardById(cardId);
			setCard(res);
			setLesson(res.lesson);
		} catch (error) {
			MySwal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Hubo un error al cargar los datos. Intente de nuevo',
			});
		}
	};

	useEffect(() => {
		loadSingleCard(cardId);
	}, []);

	const cardLayoud = () => (
		<div className='card m-10 card-cont'>
			<div className='row g-0'>
				<div className='content col-md-4 mb-2'>
					<p className='card-text fw-bold'>Gif de la lengua de seña:</p>
					<ShowImage name={card.correctAnswer} url={card.gif_url?.url} />
				</div>
				<div className='col-md-8'>
					<div className='card-body'>
						<h5 className='card-title mb-2 text-center'>{card.question}</h5>
						<p className='card-text fw-bold'>Restpuesta correcta:</p>
						<p className='card-text'>{card.correctAnswer}</p>
						<p className='card-text fw-bold'>Restpuesta incorrecta:</p>
						<p className='card-text'>{card.wrongAnswer}</p>
						<p className='card-text fw-bold'>Nombre de la lección:</p>
						<p className='card-text'>{lesson ? lesson.name : 'No asignado'}</p>
						<NavLink to={`/admin/card/update/${card._id}`}>
							<button className='btn btn-success'>Modificar Prueba</button>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<NavigationAdmin />
			<div className='container'>
				<h2>Ver información de la Prueba</h2>
				{card && cardLayoud()}
			</div>
		</>
	);
};

export default ViewKnowledgeCard;
