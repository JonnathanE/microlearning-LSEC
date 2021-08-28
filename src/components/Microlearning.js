import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { readMicrolearning } from '../core/apiCore';
import NavigationAdmin from '../layout/NavigationAdmin';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ShowImage from './ShowImage';

import './Microlearning.css';

const Microlearning = () => {

    const [microlearning, setMicrolearning] = useState({});
    const [lesson, setLesson] = useState({});

    // get param moduleId for url
    const { microId } = useParams();

    const MySwal = withReactContent(Swal);

    const loadSingleMicrolearning = microId => {
        readMicrolearning(microId).then(data => {
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            } else {
                setMicrolearning(data);
                setLesson(data.lesson);
            }
        })
    }

    useEffect(() => {
        loadSingleMicrolearning(microId);
    }, [])

    const card = () => (
        <div className="card m-10 card-cont">
            <div className="row g-0">
                <div className="content col-md-4">
                    <p className="card-text fw-bold">Gif de la lengua de seña:</p>
                    <ShowImage styles='img-fluid' item={microlearning} url='micro/gif' />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title mb-2 text-center">{microlearning.title}</h5>
                        <p className="card-text fw-bold">Nombre de la lección:</p>
                        <p className="card-text">{lesson ? lesson.name : 'No asignado'}</p>
                        <NavLink to={`/admin/micro/update/${microlearning._id}`}>
                            <button className='btn btn-success'>Modificar Microcontenido</button>
                        </NavLink>
                    </div>
                </div>
                <div className="content col-md-4">
                    <p className="card-text fw-bold">Imágen representativa:</p>
                    <ShowImage className='' item={microlearning} url='micro/image' />
                </div>
            </div>
        </div>
    )

    return (
        <>
            <NavigationAdmin />
            <div className='container'>
                <h2>Ver información del Microcontenido</h2>
                {microlearning && card()}
            </div>
        </>
    )
}

export default Microlearning;