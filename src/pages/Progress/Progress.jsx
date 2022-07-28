import { useState, useEffect } from 'react';
import { getLessons } from '../../api/apiCallsAdmin';
import { getCompleteLearn } from '../../api/apiCallsUser';
import tw, { styled } from 'twin.macro';
import useAuth from '../../auth/useAuth';
import Navbar from '../../components/Navbar/Navbar';
import { Doughnut } from 'react-chartjs-2';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Content = styled.div`
    ${tw`
            w-full min-h-screen font-sans text-gray-900 dark:bg-gray-800
        `
    }
    ${({ active }) => active ? tw`overflow-hidden h-screen` : tw``}
`;

const TableTd = styled.td`
    ${tw`
            py-4 px-6
        `
    }
    ${({ state }) => state === 'completed' ? tw`text-green-700` : tw`text-red-700`}
`;


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
        <Content active={false}>

            <Navbar activeMenu="Progress" />

            <div className='flex flex-wrap-reverse gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24 dark:text-white'>

                <div className='w-full flex flex-col gap-9'>

                    <h2 className='font-bold text-2xl text-center'>Avance de las Lecciones</h2>

                    <div className='w-full flex flex-col lg:flex-row'>

                        <div className='relative w-full lg:w-1/2 flex justify-center'>
                            <div className='w-72 h-72 lg:w-96 lg:h-96'>
                                <Doughnut data={data} height={400} width={600} options={optionsDaughnut} />
                            </div>
                        </div>

                        <div className='w-full lg:w-1/2'>
                            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        <th scope="col" class="py-3 px-6"># de Módulo</th>
                                        <th scope="col" class="py-3 px-6">Lecciones</th>
                                        <th scope="col" class="py-3 px-6">Completado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lessons.map((lesson, i) => (
                                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{lesson.module ? lesson.module.number : 'Próximamente'}</th>
                                            <td className='py-4 px-6'>{lesson.name}</td>
                                            {
                                                completeLesson.find(element => element === lesson._id)
                                                    ? <TableTd state='completed'><FaCheckCircle /></TableTd>
                                                    : <TableTd ><FaTimesCircle /></TableTd>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default Progress;