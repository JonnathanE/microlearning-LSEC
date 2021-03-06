import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { addMicrolearning, getLessons } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
        <form className="sign-box" onSubmit={handleSubmit(clickSubmit)}>
            <div className="form-group">
                <label className="text-muted">Título del Microcontenido</label>
                <input type="text" {...register('title')} className='form-control' />
                {errors.title && errorValidator(errors.title.message)}
            </div>
            <div className='form-group'>
                <label className='text-muted'>Lección</label>
                <select type='text' {...register('lesson')} className='form-select' >
                    <option value=''>Selecciona una Lección</option>
                    {lessons && lessons.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {errors.lesson && errorValidator(errors.lesson.message)}
            </div>
            <div className='form-group'>
                <label className='form-label' htmlFor="imageFile">Imágen representativa
                </label>
                <input type='file' accept='image/*' {...register('image')} id='imageFile' className='form-control' />
                {errors.image && errorValidator(errors.image.message)}
            </div>
            <div className='form-group mb-3'>
                <label className='form-label' htmlFor="gifFile">Gif
                </label>
                <input type='file' accept='image/*' {...register('gif')} id='gifFile' className='form-control' />
                {errors.gif && errorValidator(errors.gif.message)}
            </div>
            <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink>
            <input type='submit' className="btn btn-primary" />
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
                    <h2 className='text-center mt-2'>Crear nuevo Microcontenido</h2>
                </div>
                <div className='row'>
                    {showLoading()}
                    {signInForm()}
                </div>
            </div>
        </>
    )
}

export default AddMicrolearning;