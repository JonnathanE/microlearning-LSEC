import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { updateMicrolearningImage } from '../core/apiCore';
import useAuth from '../auth/useAuth';
import Spinner from './Spinner';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UpdateImage = ({ content }) => {

    const [formData, setFormData] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = useAuth();

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        image: yup.mixed().test("fileSize", "La imágen debe ser 9MB", (value) => {
            if (value.length === 0) return false;
            return value[0].size <= 9000000;
        })
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit icon method
    const clickSubmitIcon = data => {
        setFormData(new FormData());
        formData.append('image', data.image[0]);
        MySwal.fire({
            title: <p>¿Quieres guardar los cambios?</p>,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Guardar cambios`,
            denyButtonText: `No guardar`,
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                updateMicrolearningImage(auth.user.token, content._id, formData).then(data => {
                    if (data.error) {
                        setLoading(false);
                        MySwal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.error
                        })
                    } else {
                        setLoading(false);
                        MySwal.fire('¡La imágen se actualizó correctamente!', '', 'success');
                        reset({
                            icon: ''
                        });
                    }
                })
            } else if (result.isDenied) {
                setLoading(false);
                MySwal.fire('Los cambios no se guardan', '', 'info');
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

    const imageForm = () => (
        <form className="sign-box" onSubmit={handleSubmit(clickSubmitIcon)}>
            <div className='form-group'>
                <label className='form-label' htmlFor="imageFile">Imágen Representativa
                </label>
                <input type='file' accept='image/*' {...register('image')} id='imageFile' className='form-control' />
                {errors.image && errorValidator(errors.image.message)}
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
            {imageForm()}
        </>
    )
}

export default UpdateImage;