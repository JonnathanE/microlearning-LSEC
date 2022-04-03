import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getMicrolearningById } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import ShowImage from '../../components/ShowImage/ShowImage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './viewMicrolearning.css';

const ViewMicrolearning = () => {

    const [microlearning, setMicrolearning] = useState({});
    const [lesson, setLesson] = useState({});

    // get param moduleId for url
    const { microId } = useParams();

    const MySwal = withReactContent(Swal);

    const loadSingleMicrolearning = async microId => {
        try {
            const res = await getMicrolearningById(microId);
            setMicrolearning(res);
            setLesson(res.lesson);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al cargar los datos. Intente de nuevo.'
            })
        }
    }

    useEffect(() => {
        loadSingleMicrolearning(microId);
    }, [])

    const card = () => (
        <div className="card m-10 card-cont">
            <div className="row g-0">
                <div className="content col-md-4">
                    <p className="card-text fw-bold">Gif de la lengua de seña:</p>
                    <ShowImage styles='img-fluid' name={microlearning.title} url={microlearning.gif_url?.url} />
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
                    <ShowImage styles='img-fluid' name={microlearning.title} url={microlearning.image_url?.url} />
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

export default ViewMicrolearning;