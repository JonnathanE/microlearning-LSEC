import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { updateCard, getLessons, getCardById } from '../../api/apiCallsAdmin';
import Spinner from '../../components/Spinner/Spinner';
import UpdateGifCard from '../../components/UpdateGifCard/UpdateGifCard';
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

const Form = tw.form`
    flex flex-col gap-6 justify-center items-center mb-4 sm:px-9
`;

const FormGroup = tw.div`
    w-full lg:w-5/6 flex flex-col
`;

const UpdateCard = () => {

    const [lessons, setLessons] = useState([]);
    const [singleLesson, setSingleLeson] = useState({});
    const [card, setCard] = useState({});
    const [loading, setLoading] = useState(false);

    // get param moduleId for url
    const { cardId } = useParams();

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        question: yup.string().required('Requiere ingresar una pregunta'),
        lesson: yup.string().ensure().required('Debe de elegir una lección'),
        correctAnswer: yup.string().ensure().required('Requiere ingresar la respuesta correcta a evaluar'),
        wrongAnswer: yup.string().ensure().required('Requiere ingresar la respuesta incorrecta a evaluar'),
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit method
    const clickSubmit = data => {
        MySwal.fire({
            title: <p>¿Quieres guardar los cambios?</p>,
            showCancelButton: true,
            confirmButtonText: `Guardar cambios`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await updateCard(card._id, data);
                    setLoading(false);
                    MySwal.fire('¡La tarjeta se actualizó correctamente!', '', 'success');
                } catch (error) {
                    setLoading(false);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.error || 'Hubo un error al actualizar los datos. Intente de nuevo.'
                    })
                }
            }
        })
    }

    const allLesons = async () => {
        try {
            const res = await getLessons();
            setLessons(res);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al cargar las lecciones. Intente de nuevo.'
            })
        }
    }

    const loadSingleCard = async cardId => {
        try {
            const res = await getCardById(cardId)
            setCard(res);
            setSingleLeson(res.lesson);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al cargar los datos. Intente de nuevo.'
            })
        }
    }

    useEffect(() => {
        allLesons();
        loadSingleCard(cardId);
    }, [])

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const cardForm = () => (
        <Form onSubmit={handleSubmit(clickSubmit)}>
            <FormGroup>
                <label>Pregunta</label>
                <input type="text" {...register('question')} defaultValue={card.question} className='dark:bg-gray-800' data-testid='inputQuestion' />
                {errors.question && errorValidator(errors.question.message)}
            </FormGroup>
            <FormGroup>
                <label>Lección</label>
                <select type='text' {...register('lesson')} className='dark:bg-gray-800' >
                    <option value={singleLesson ? singleLesson._id : ''}>{singleLesson ? singleLesson.name : 'Seleccione un módulo'}</option>
                    {lessons && lessons.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {errors.lesson && errorValidator(errors.lesson.message)}
            </FormGroup>
            <FormGroup>
                <label>Restpuesta correcta</label>
                <input type="text" {...register('correctAnswer')} defaultValue={card.correctAnswer} className='dark:bg-gray-800' data-testid='inputCorrectAnswer' />
                {errors.correctAnswer && errorValidator(errors.correctAnswer.message)}
            </FormGroup>
            <FormGroup>
                <label>Respuesta incorrecta</label>
                <input type="text" {...register('wrongAnswer')} defaultValue={card.wrongAnswer} className='dark:bg-gray-800' data-testid='inputWrongAnswer' />
                {errors.wrongAnswer && errorValidator(errors.wrongAnswer.message)}
            </FormGroup>
            {/* <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink> */}
            <input type='submit' className="w-36 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer" value='Actualizar' />
        </Form>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Spinner />
        )

    return (
        <LayoutAdmin>
            <Container>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg'>
                    <Title className='text-start'>Actualizar Tarjeta de Aprendizaje</Title>
                </div>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg dark:text-white flex flex-col sm:flex-row gap-2'>
                    {showLoading()}
                    <div className='flex-1 flex-col'>
                        <UpdateGifCard content={card} />
                    </div>
                    <div className='flex-[1] border p-2'>
                        {cardForm()}
                    </div>
                </div>
            </Container>
        </LayoutAdmin>
    )
}

export default UpdateCard;