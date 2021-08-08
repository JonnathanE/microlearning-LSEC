import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { readCard} from '../../core/apiCore';
import NavigationAdmin from '../../layout/NavigationAdmin';
import ShowImage from '../ShowImage';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const KnowledgeCard = () => {

    const [card, setCard] = useState({});
    const [lesson, setLesson] = useState({});

    // get param moduleId for url
    const { cardId } = useParams();

    const MySwal = withReactContent(Swal);

    const loadSingleCard = microId => {
        readCard(microId).then(data => {
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            } else {
                setCard(data);
                setLesson(data.lesson);
            }
        })
    }

    useEffect(() => {
        loadSingleCard(cardId);
    }, [])

    const cardLayoud = () => (
        <div className="card m-10 card-cont">
            <div className="row g-0">
                <div className="col-md-4">
                    <p className="card-text fw-bold">Gif de la lengua de seña:</p>
                    <ShowImage className='' item={card} url='card/gif' />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title mb-2 text-center">{card.question}</h5>
                        <p className="card-text fw-bold">Nombre de la lección:</p>
                        <p className="card-text">{lesson ? lesson.name : 'No asignado'}</p>
                        <NavLink to={`/admin/card/update/${card._id}`}>
                            <button className='btn btn-success'>Modificar Prueba</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <NavigationAdmin />
            <div className='container'>
                <h2>Ver información de la Prueba</h2>
                {card && cardLayoud()}
            </div>
        </>
    )
}

export default KnowledgeCard;