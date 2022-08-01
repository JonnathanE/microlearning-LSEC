import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateCardGif } from '../../api/apiCallsAdmin';
import Spinner from '../Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import tw from 'twin.macro';
import ShowImage from '../ShowImage/ShowImage';

const Form = tw.form`
    flex flex-col gap-6 justify-center items-center mb-4
`;

const FormGroup = tw.div`
    w-full flex flex-col
`;

const UpdateGifCard = ({ content }) => {

    const [loading, setLoading] = useState(false);

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        gif: yup.mixed().test("fileSize", "El gif debe ser 9MB", (value) => {
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
        formData.append('gif', data.gif[0]);
        MySwal.fire({
            title: <p>¿Quieres guardar los cambios?</p>,
            showCancelButton: true,
            confirmButtonText: `Guardar cambios`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await updateCardGif(content._id, formData);
                    setLoading(false);
                    MySwal.fire('¡El Gif se actualizó correctamente!', '', 'success');
                    reset({
                        gif: ''
                    });
                } catch (error) {
                    setLoading(false);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.error
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
        <Form onSubmit={handleSubmit(clickSubmitIcon)}>
            <FormGroup>
                <label htmlFor="gifFile">Gif de la lengua de señas
                </label>
                <input type='file' accept='image/*' {...register('gif')} id='gifFile' />
                {errors.gif && errorValidator(errors.gif.message)}
            </FormGroup>
            <input type='submit' className="w-40 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer" value='Actualizar Gif' />
        </Form>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Spinner />
        )

    return (
        <div className='w-full flex flex-col items-center border p-3'>
            {showLoading()}
            <div className='w-[250px] h-[250px] flex items-center justify-center overflow-hidden object-cover bg-slate-400'>
                <ShowImage url={content?.gif_url?.url} styles='w-[250px] h-[250px]' name='capsula gif' />
            </div>
            {imageForm()}
        </div>
    )
}

export default UpdateGifCard;