import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateLessonIcon } from '../../api/apiCallsAdmin';
import ShowImage from '../ShowImage/ShowImage';
import { API } from '../../config';
import Spinner from '../Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import tw from 'twin.macro';

const Form = tw.form`
    flex flex-col gap-6 justify-center items-center mb-4
`;

const FormGroup = tw.div`
    w-full flex flex-col
`;

const UpdateIcon = ({ lesson }) => {

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
        let formData = new FormData();
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

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    const iconForm = () => (
        <Form onSubmit={handleSubmit(clickSubmitIcon)}>
            <FormGroup>
                <label htmlFor="iconFile">Actualizar icono
                </label>
                <input type='file' accept='image/*' {...register('icon')} id='iconFile' className='form-control' />
                {errors.icon && errorValidator(errors.icon.message)}
            </FormGroup>
            <input type='submit' className="w-40 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer" value="Actualizar Icono" />
        </Form>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Spinner />
        )

    return (
        <div className='w-full flex flex-col items-center'>
            {showLoading()}
            <div className='w-[72px] h-[72px] flex items-center justify-center rounded-full overflow-hidden object-cover bg-slate-400'>
                <ShowImage url_buffer={`${API}/lesson/icon/${lesson._id}`} styles='w-[55px] h-[55px]' name='lesson icon' />
            </div>
            {iconForm()}
        </div>
    )
}

export default UpdateIcon;