import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { addLesson, getModules } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddLesson = () => {

    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        name: yup.string().required('El nombre de la lección es requerido'),
        module: yup.string().ensure().required('Debe de elegir un módulo'),
        icon: yup.mixed().test("fileSize", "El icono debe ser 1MB", (value) => {
            if (value.length === 0) return false;
            return value[0].size <= 1000000;
        })
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit method
    const clickSubmit = async data => {
        let formData = new FormData();
        setLoading(true);
        formData.append('name', data.name);
        formData.append('module', data.module);
        formData.append('icon', data.icon[0]);
        try {
            await addLesson(formData);
            setLoading(false);
            MySwal.fire('¡Lección creado con éxito!', '', 'success');
            reset({
                name: '',
                module: 'Selecciona Módulo',
                icon: ''
            });
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error
            })
        }
    };

    const init = async () => {
        try {
            const res = await getModules();
            setModules(res);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se cargaron los módulos. Intente de nuevo.'
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
            <div className='form-group'>
                <label className='form-label' htmlFor="iconFile">Icono
                </label>
                <input type='file' accept='image/*' {...register('icon')} id='iconFile' className='form-control' />
                {errors.icon && errorValidator(errors.icon.message)}
            </div>
            <div className="form-group">
                <label className="text-muted">Nombre de la lección</label>
                <input type="text" {...register('name')} className='form-control' />
                {errors.name && errorValidator(errors.name.message)}
            </div>
            <div className='form-group'>
                <label className='text-muted'>Módulo</label>
                <select type='text' {...register('module')} className='form-select' >
                    <option value=''>Selecciona Módulo</option>
                    {modules && modules.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {errors.module && errorValidator(errors.module.message)}
            </div>
            <div className="form-group mb-3">

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
                    <h2 className='text-center mt-2'>Crear nueva Lección</h2>
                </div>
                <div className='row'>
                    {showLoading()}
                    {signInForm()}
                </div>
            </div>
        </>
    )
}

export default AddLesson;