import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateLessonIcon } from '../../api/apiCallsAdmin';

import Spinner from '../Spinner/Spinner';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UpdateIcon = ({ lesson }) => {

    const [formData, setFormData] = useState('');
    const [loading, setLoading] = useState(false);

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        icon: yup.mixed().test("fileSize", "El icono debe ser 1MB", (value) => {
            if (value.length === 0) return false;
            return value[0].size <= 1000000;
        })
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit icon method
    const clickSubmitIcon = data => {
        setFormData(new FormData());
        formData.append('icon', data.icon[0]);
        MySwal.fire({
            title: <p>¿Quieres guardar los cambios?</p>,
            showCancelButton: true,
            confirmButtonText: `Guardar cambios`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await updateLessonIcon(lesson._id, formData)
                    setLoading(false);
                    MySwal.fire('¡El icono se actualizó correctamente!', '', 'success');
                    reset({
                        icon: ''
                    });
                } catch (error) {
                    setLoading(false);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hubo un error al actualizar el icono. Intente de nuevo'
                    })
                }
            }
        })
    };

    useEffect(() => {
        setFormData(new FormData());
    }, [])

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    const iconForm = () => (
        <form className="sign-box" onSubmit={handleSubmit(clickSubmitIcon)}>
            <div className='form-group'>
                <label className='form-label' htmlFor="iconFile">Icono
                </label>
                <input type='file' accept='image/*' {...register('icon')} id='iconFile' className='form-control' />
                {errors.icon && errorValidator(errors.icon.message)}
            </div>
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
            {showLoading()}
            {iconForm()}
        </>
    )
}

export default UpdateIcon;