import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getLessonById } from '../../api/apiCallsAdmin';
import { API } from '../../config';
import ShowImage from '../../components/ShowImage/ShowImage';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import tw from 'twin.macro';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';

const Container = tw.div`
    p-5 flex flex-col items-center gap-5
`;

const Title = tw.h2`
    font-bold text-xl text-gray-600 dark:text-gray-400
`;

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
        <div className="w-full flex flex-col lg:flex-row justify-around">
            <div className="w-56 h-56">
                <ShowImage styles='w-56 h-56' name={lesson.name} url_buffer={`${API}/lesson/icon/${lesson._id}`} />
            </div>
            <div className="w-3/5">
                <div className="p-5 border rounded-xl flex flex-col gap-3">
                    <h3 className="font-bold text-bookmark-cyan-500 text-center">{lesson.name}</h3>
                    <div>
                        <p className="font-bold">Número de Módulo:</p>
                        <p>{module ? module.number : 'No asignado'}</p>
                    </div>
                    <div>
                        <p className="font-bold">Nombre de Módulo:</p>
                        <p>{module ? module.name : 'No asignado'}</p>
                    </div>
                    <NavLink to={`/admin/lesson/update/${lesson._id}`}>
                        <button className='w-52 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer'>Modificar Lección</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )

    return (
        <LayoutAdmin>
            <Container>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg'>
                    <Title className='text-start'>Ver información de la lección</Title>
                </div>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg dark:text-white flex flex-col sm:flex-row gap-2'>
                    {lesson && card()}
                </div>
            </Container>
        </LayoutAdmin>
    )
}

export default ViewLesson;