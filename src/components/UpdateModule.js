import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useParams } from 'react-router-dom';
import { readModule } from '../core/apiCore';
import NavigationAdmin from '../layout/NavigationAdmin';
import Spinner from './Spinner';

const UpdateModule = (props) => {

    const [module, setModule] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // get param moduleId for url
    const { moduleId } = useParams();

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
                setError(data.error);
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
        console.log(data);
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
                <input type="number" {...register('number')} defaultValue={module.number} className='form-control' min={1} />
                {errors.number && errorValidator(errors.number.message)}
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Nombre</label>
                <input type="text" {...register('name')} defaultValue={module.name} className='form-control' />
                {errors.name && errorValidator(errors.name.message)}
            </div>
            <NavLink to='/admin/showmodules'>
                <button type='button' className="btn btn-danger ms-4 me-4">Cancelar</button>
            </NavLink>
            <input type='submit' className="btn btn-primary" />
        </form>
    )

    return (
        <>
            <NavigationAdmin />
            <div className='container'>
                <div className='row'>
                    <h2 className='text-center mt-2'>Modificar el módulo {module.name}</h2>
                </div>
                <div className='row'>
                    {signInForm()}
                </div>
            </div>
        </>
    )
}

export default UpdateModule;