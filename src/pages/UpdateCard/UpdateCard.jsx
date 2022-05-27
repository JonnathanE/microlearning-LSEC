import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useParams } from 'react-router-dom';
import { updateCard, getLessons, getCardById } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import UpdateGifCard from '../../components/UpdateGifCard/UpdateGifCard';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


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
        question: yup.string().required('El nombre de la lección es requerido'),
        lesson: yup.string().ensure().required('Debe de elegir una lección'),
        correctAnswer: yup.string().ensure().required('La respuesta correcta es requerido'),
        wrongAnswer: yup.string().ensure().required('La respuesta incorrecta es requerido'),
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
                    MySwal.fire('¡El Microcontenido se actualizó correctamente!', '', 'success');
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
        <form className="sign-box" onSubmit={handleSubmit(clickSubmit)}>
            <div className="form-group">
                <label className="text-muted">Pregunta</label>
                <input type="text" {...register('question')} defaultValue={card.question} className='form-control' data-testid='inputQuestion' />
                {errors.question && errorValidator(errors.question.message)}
            </div>
            <div className='form-group'>
                <label className='text-muted'>Lección</label>
                <select type='text' {...register('lesson')} className='form-select' >
                    <option value={singleLesson ? singleLesson._id : ''}>{singleLesson ? singleLesson.name : 'Seleccione un módulo'}</option>
                    {lessons && lessons.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {errors.lesson && errorValidator(errors.lesson.message)}
            </div>
            <div className="form-group">
                <label className="text-muted">Restpuesta correcta</label>
                <input type="text" {...register('correctAnswer')} defaultValue={card.correctAnswer} className='form-control' data-testid='inputCorrectAnswer' />
                {errors.correctAnswer && errorValidator(errors.correctAnswer.message)}
            </div>
            <div className="form-group">
                <label className="text-muted">Respuesta incorrecta</label>
                <input type="text" {...register('wrongAnswer')} defaultValue={card.wrongAnswer} className='form-control' data-testid='inputWrongAnswer' />
                {errors.wrongAnswer && errorValidator(errors.wrongAnswer.message)}
            </div>
            <div className="form-group mb-3">
            </div>
            <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink>
            <input type='submit' className="btn btn-primary" value='Actualizar' />
        </form>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Spinner />
        )

    return (
        <>
            <NavigationAdmin />
            <div className='container'>
                <div className='row'>
                    <h2 className='text-center mt-2'>Actualizar Tarjeta de Aprendizaje</h2>
                </div>
                <div className='row'>
                    {showLoading()}
                    <UpdateGifCard content={card} />
                    {cardForm()}
                </div>
            </div>
        </>
    )
}

export default UpdateCard;