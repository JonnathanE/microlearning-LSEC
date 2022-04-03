import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getLessonById } from '../../api/apiCallsAdmin';
import { API } from '../../config';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import ShowImage from '../../components/ShowImage/ShowImage';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './viewLesson.css';

const ViewLesson = () => {

    const [lesson, setLesson] = useState({});
    const [module, setModule] = useState({});

    // get param moduleId for url
    const { lessonId } = useParams();

    const MySwal = withReactContent(Swal);

    const loadSingleLesson = async lessonId => {
        try {
            const res = await getLessonById(lessonId);
            setLesson(res);
            setModule(res.module);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontraron los datos. Intente de nuevo.'
            })
        }
    }

    useEffect(() => {
        loadSingleLesson(lessonId);
    }, [])

    const card = () => (
        <div className="card m-10 card-cont">
            <div className="row g-0">
                <div className="content col-md-4">
                    <ShowImage styles='img-fluid' name={lesson.name} url_buffer={`${API}/lesson/icon/${lesson._id}`} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title mb-2 text-center">{lesson.name}</h5>
                        <p className="card-text fw-bold">Número de Módulo:</p>
                        <p className="card-text">{module ? module.number : 'No asignado'}</p>
                        <p className="card-text fw-bold">Nombre de Módulo:</p>
                        <p className="card-text">{module ? module.name : 'No asignado'}</p>
                        <NavLink to={`/admin/lesson/update/${lesson._id}`}>
                            <button className='btn btn-success'>Modificar Lección</button>
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
                <h2>Ver información de la lección</h2>
                {lesson && card()}
            </div>
        </>
    )
}

export default ViewLesson;