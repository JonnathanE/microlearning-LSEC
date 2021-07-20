import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useParams } from 'react-router-dom';
import { readModule, updateModule } from '../core/apiCore';
import NavigationAdmin from '../layout/NavigationAdmin';
import useAuth from '../auth/useAuth';
import Spinner from './Spinner';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UpdateModule = (props) => {

    const [module, setModule] = useState({});
    const [loading, setLoading] = useState(false);

    // get param moduleId for url
    const { moduleId } = useParams();

    const auth = useAuth();

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        number: yup.number().required().positive().integer(),
        name: yup.string().required(),
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // load moduel for API
    const loadSingleModule = moduelId => {
        readModule(moduelId).then(data => {
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            } else {
                setModule(data);
            }
        });
    }

    useEffect(() => {
        loadSingleModule(moduleId);
    }, [props])

    // submit method
    const clickSubmit = data => {
        setLoading(false);
        console.log(data);
        MySwal.fire({
            title: <p>¿Quieres guardar los cambios?</p>,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Guardar cambios`,
            denyButtonText: `No guardar`,
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                updateModule(moduleId, auth.user.token, data)
                    .then(data => {
                        if (data.error) {
                            setLoading(false);
                            MySwal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: data.error
                            })
                        } else {
                            setLoading(false);
                            MySwal.fire('¡Gurdado!', '', 'success');
                            loadSingleModule(moduleId);
                        }
                    })
            } else if (result.isDenied) {
                MySwal.fire('Los cambios no se guardan', '', 'info')
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
            <div className="form-group">
                <label className="text-muted">Número de módulo</label>
                <input type="number" {...register('number')} defaultValue={module.number} className='form-control' min={0} />
                {errors.number && errorValidator(errors.number.message)}
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Nombre</label>
                <input type="text" {...register('name')} defaultValue={module.name} className='form-control' />
                {errors.name && errorValidator(errors.name.message)}
            </div>
            <NavLink to='/admin/showmodules'>
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
                    <h2 className='text-center mt-2'>Modificar el módulo {module.name}</h2>
                </div>
                <div className='row'>
                    {showLoading()}
                    {signInForm()}
                </div>
            </div>
        </>
    )
}

export default UpdateModule;