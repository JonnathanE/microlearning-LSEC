import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { NavLink } from 'react-router-dom';
import { addModule } from '../../api/apiCallsAdmin';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AddModule = () => {

    const [loading, setLoading] = useState(false);

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        number: yup.number().positive().integer().required('Requiere que ingrese un número para el módulo'),
        name: yup.string().required('Requiere que ingrese un nombre para el módulo'),
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit method
    const clickSubmit = data => {
        setLoading(false);
        MySwal.fire({
            title: <p>¿Quieres Crear el nuevo módulo?</p>,
            showCancelButton: true,
            confirmButtonText: `Crear`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await addModule(data);
                    setLoading(false);
                    MySwal.fire('¡Módulo creado con éxito!', '', 'success');
                } catch (error) {
                    setLoading(false);
                    if (error.response?.status === 400) {
                        MySwal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El módulo ya existe. Revise que el número o el nombre no sea repetido.'
                        })
                    } else {
                        MySwal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Hubo un error al crear el módulo. Intente de nuevo.'
                        })
                    }
                }
            }
        })
    };

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const signInForm = () => (
        <form className="flex flex-col gap-13 justify-center items-center mb-4" onSubmit={handleSubmit(clickSubmit)}>
            <div className="w-full sm:w-2/5 flex flex-col">
                <label className="">Número de módulo</label>
                <input type="number" {...register('number')} className='w-full border-t-0 border-r-0 border-l-0 border-b-2 border-b-gray-400 dark:bg-gray-800' min={0} aria-label='numero del modulo' />
                {errors.number && errorValidator(errors.number.message)}
            </div>
            <div className="w-full sm:w-2/5 flex flex-col">
                <label className="">Nombre</label>
                <input type="text" {...register('name')} className='w-full border-t-0 border-r-0 border-l-0 border-b-2 border-b-gray-400 dark:bg-gray-800' aria-label='nombre del modulo' />
                {errors.name && errorValidator(errors.name.message)}
            </div>
            {/* <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink> */}
            <input type='submit' className="w-36 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer" value="Crear" />
        </form>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Spinner />
        )

    return (
        <LayoutAdmin>
            <div className='p-5 flex flex-col items-center gap-5'>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg'>
                    <h2 className='font-bold text-xl text-start text-gray-400'>Crear nuevo módulo</h2>
                </div>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg dark:text-white'>
                    {showLoading()}
                    {signInForm()}
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default AddModule;