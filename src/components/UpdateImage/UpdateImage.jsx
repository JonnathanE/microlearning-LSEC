import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateMicrolearningImage } from '../../api/apiCallsAdmin';

import Spinner from '../Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UpdateImage = ({ content }) => {

    const [loading, setLoading] = useState(false);

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
        let formData = new FormData();
        formData.append('image', data.image[0]);
        MySwal.fire({
            title: <p>¿Quieres guardar los cambios?</p>,
            showCancelButton: true,
            confirmButtonText: `Guardar cambios`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await updateMicrolearningImage(content._id, formData)
                    setLoading(false);
                    MySwal.fire('¡La imágen se actualizó correctamente!', '', 'success');
                    reset({
                        icon: ''
                    });
                } catch (error) {
                    setLoading(false);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hubo un error al actualizar la imágen. Intente de nuevo.'
                    })
                }
            }
        })
    };

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
            <input type='submit' className="btn btn-primary" value='Actualizar Imagen' />
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