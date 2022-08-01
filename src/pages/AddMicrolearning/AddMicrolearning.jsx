import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { NavLink } from 'react-router-dom';
import { addMicrolearning, getLessons } from '../../api/apiCallsAdmin';
import tw from 'twin.macro';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Container = tw.div`
    p-5 flex flex-col items-center gap-5
`;

const Title = tw.h2`
    font-bold text-xl text-gray-400
`;

const Form = tw.form`
    flex flex-col gap-6 justify-center items-center mb-4
`;

const FormGroup = tw.div`
    w-full sm:w-2/5 flex flex-col
`;

const AddMicrolearning = () => {

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        title: yup.string().required('El nombre de la lección es requerido'),
        lesson: yup.string().ensure().required('Debe de elegir un módulo'),
        image: yup.mixed().test("fileSize", "La imágen debe ser 9 MB", (value) => {
            if (value.length === 0) return false;
            return value[0].size <= 9000000;
        }),
        gif: yup.mixed().test("fileSize", "El gif debe ser 9 MB", (value) => {
            if (value.length === 0) return false;
            return value[0].size <= 9000000;
        })
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit method
    const clickSubmit = async data => {
        setLoading(true);
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('lesson', data.lesson);
        formData.append('image', data.image[0]);
        formData.append('gif', data.gif[0]);
        try {
            await addMicrolearning(formData);
            setLoading(false);
            MySwal.fire('¡Microcontenido creado con éxito!', '', 'success');
            reset({
                title: '',
                lesson: 'Selecciona una lección',
                image: '',
                gif: ''
            });
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al crear el microcontenido. Intente de nuevo'
            })
        }
    };

    const init = async () => {
        try {
            const res = await getLessons();
            setLessons(res);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se cargaron las lecciones. Intente de nuevo.'
            })
        }
    }

    useEffect(() => {
        init();
    }, [])

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const signInForm = () => (
        <Form onSubmit={handleSubmit(clickSubmit)}>
            <FormGroup>
                <label>Título de la Cápsulas de Aprendizaje</label>
                <input type="text" {...register('title')} className='dark:bg-gray-800' data-testid='inputTitle' />
                {errors.title && errorValidator(errors.title.message)}
            </FormGroup>
            <FormGroup>
                <label>Lección</label>
                <select type='text' {...register('lesson')} className='dark:bg-gray-800' >
                    <option value=''>Selecciona una Lección</option>
                    {lessons && lessons.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {errors.lesson && errorValidator(errors.lesson.message)}
            </FormGroup>
            <FormGroup>
                <label htmlFor="imageFile">Imágen representativa
                </label>
                <input type='file' accept='image/*' {...register('image')} id='imageFile' className='dark:bg-gray-800' />
                {errors.image && errorValidator(errors.image.message)}
            </FormGroup>
            <FormGroup>
                <label htmlFor="gifFile">Gif
                </label>
                <input type='file' accept='image/*' {...register('gif')} id='gifFile' className='dark:bg-gray-800' />
                {errors.gif && errorValidator(errors.gif.message)}
            </FormGroup>
            {/* <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink> */}
            <input type='submit' className="w-36 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer" value='Crear' />
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
                    <Title className='text-start'>Crear Cápsulas de Aprendizaje</Title>
                </div>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg dark:text-white'>
                    {showLoading()}
                    {signInForm()}
                </div>
            </Container>
        </LayoutAdmin>
    )
}

export default AddMicrolearning;