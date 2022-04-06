import { useState, useEffect } from 'react';
import { getLessons } from '../../api/apiCallsAdmin';
import { getCompleteLearn } from '../../api/apiCallsUser';
import useAuth from '../../auth/useAuth';

import Navigation from '../../components/Navigation/Navigation';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Progress = () => {

    const auth = useAuth();
    const MySwal = withReactContent(Swal);

    const [lessons, setLessons] = useState([]);
    const [completeLesson, setCopleteLesson] = useState([]);

    const loadLessons = async () => {
        try {
            const res = await getLessons();
            setLessons(res);
            loadCompleteLearn();
        } catch (error) {
            console.log(error)
        }
    }

    const loadCompleteLearn = async () => {
        try {
            const res = await getCompleteLearn(auth.user.token);
            setCopleteLesson(res.lesson);
        } catch (error) {
            console.log(error)
            if (error.response?.status === 401) {
                MySwal.fire({
                    title: 'Sesión Acabada',
                    icon: 'info',
                    showCloseButton: true,
                    text: 'Usted puede seguir navegando en la página, pero su progreso no se guardarán. Le recomendamos iniciar sesión.',
                    confirmButtonText: 'Iniciar Sesión'
                }).then(response => {
                    if (response.isConfirmed) {
                        auth.logout();
                    }
                })
            }
        }
    }

    useEffect(() => {
        loadLessons();
    }, [])

    const data = {
        labels: ['Completado', 'Por completar'],
        datasets: [{
            label: 'Net sales',
            data: [completeLesson.length, lessons.length - completeLesson.length],
            parsing: {
                yAxisKey: 'net'
            },
            backgroundColor: [
                '#3FB42F',
                '#F74D4D'
            ],
            borderColor: [
                '#000'
            ],
            hoverOffset: 4
        }],
    }

    const optionsDaughnut = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Lecciones Completadas',
                padding: {
                    top: 10,
                    bottom: 30
                },
                fullSize: true
            }
        }
    }

    return (
        <>
            <Navigation />
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h2>Avance de las Lecciones</h2>
                    </div>
                </div>
                <div className='row mt-1'>
                    <div className='col-12'>
                        <Doughnut data={data} height={400} width={600} options={optionsDaughnut} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col"># de Módulo</th>
                                    <th scope="col">Lecciones</th>
                                    <th scope="col">Completado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessons.map((lesson, i) => (
                                    <tr key={i}>
                                        <th scope="row">{lesson.module ? lesson.module.number : 'Próximamente'}</th>
                                        <td>{lesson.name}</td>
                                        {
                                            completeLesson.find(element => element === lesson._id)
                                                ? <td className='text-success'><FaCheckCircle /></td>
                                                : <td className='text-danger'><FaTimesCircle /></td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Progress;