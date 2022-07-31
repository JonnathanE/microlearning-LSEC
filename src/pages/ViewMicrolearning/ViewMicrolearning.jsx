import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getMicrolearningById } from '../../api/apiCallsAdmin';
import ShowImage from '../../components/ShowImage/ShowImage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import tw from 'twin.macro';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';

const Container = tw.div`
    p-5 flex flex-col items-center gap-5
`;

const Title = tw.h2`
    font-bold text-xl text-gray-600 dark:text-gray-400
`;

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
        <div className="w-full flex flex-col lg:flex-row justify-around">
            <div className="w-4/12 flex flex-col gap-5">
                <div className='flex flex-col justify-center items-center'>
                    <p className="font-bold">Gif de la lengua de seña:</p>
                    <ShowImage styles='w-64 h-64' name={microlearning.title} url={microlearning.gif_url?.url} />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="font-bold mb-2">Imágen representativa:</p>
                    <ShowImage styles='w-56 h-56' name={microlearning.title} url={microlearning.image_url?.url} />
                </div>
            </div>
            <div className="w-3/5">
                <div className="p-5 border rounded-xl flex flex-col gap-3">
                    <h3 className="font-bold text-bookmark-cyan-500 text-center">{microlearning.title}</h3>
                    <div>
                        <p className="font-bold">Nombre de la lección:</p>
                        <p>{lesson ? lesson.name : 'No asignado'}</p>
                    </div>
                    <NavLink to={`/admin/micro/update/${microlearning._id}`}>
                        <button className='w-52 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer'>Modificar Cápsula</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )

    return (
        <LayoutAdmin>
            <Container>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg'>
                    <Title className='text-start'>Ver información del Microcontenido</Title>
                </div>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg dark:text-white flex flex-col sm:flex-row gap-2'>
                    {microlearning && card()}
                </div>
            </Container>
        </LayoutAdmin>
    )
}

export default ViewMicrolearning;