import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { addModule } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El módulo ya está creado'
                    })
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
        <form className="sign-box" onSubmit={handleSubmit(clickSubmit)}>
            <div className="form-group mb-4">
                <label className="text-muted">Número de módulo</label>
                <input type="number" {...register('number')} className='form-control' min={0} />
                {errors.number && errorValidator(errors.number.message)}
            </div>
            <div className="form-group mb-4">
                <label className="text-muted">Nombre</label>
                <input type="text" {...register('name')} className='form-control' />
                {errors.name && errorValidator(errors.name.message)}
            </div>
            <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink>
            <input type='submit' className="btn btn-primary" value="Crear" />
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
                    <h2 className='text-center mt-2'>Crear nuevo módulo</h2>
                </div>
                <div className='row'>
                    {showLoading()}
                    {signInForm()}
                </div>
            </div>
        </>
    )
}

export default AddModule;