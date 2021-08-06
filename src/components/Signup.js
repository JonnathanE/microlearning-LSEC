import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { signup } from '../core/apiCore'

import useAuth from '../auth/useAuth';
import Spinner from './Spinner';
import Navigation from '../layout/Navigation';

import './Signin.css';

const Signup = () => {
    // // state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const previusObjectUrl = location.state?.from;

    // yup schema to validate inputs
    const schema = yup.object().shape({
        email: yup.string().email('Debe ser un correo electrónico válido').required('Correo electronico es requerido'),
        password: yup.string().required('Debe de ingresar una contraseña'),
        name: yup.string().required('Debe de especificar un nombre')
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit method
    const clickSubmit = data => {
        setError(false);
        setLoading(true);
        signup(data)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setLoading(false);
                } else {
                    auth.login(data);
                    history.push(previusObjectUrl || '/home')
                }
            });
    };

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const signInForm = () => (
        <form className="" onSubmit={handleSubmit(clickSubmit)}>
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" {...register('name')} className='form-control' />
                {errors.name && errorValidator(errors.name.message)}
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" {...register('email')} className='form-control' />
                {errors.email && errorValidator(errors.email.message)}
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Password</label>
                <input type="password" {...register('password')} className='form-control' />
                {errors.password && errorValidator(errors.password.message)}
            </div>
            <div className='col-md-12 text-center'>
                <input type='submit' className="btn btn-block mybtn btn-primary tx-tfm" />
            </div>
            <div className="col-md-12 ">
                <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or">or</span>
                </div>
            </div>
            <div className="form-group">
                <p className="text-center">¿Ya tienes cuenta? <NavLink to='/signin' id="signup">Inicia Sesión aquí</NavLink></p>
            </div>
        </form>
    )

    // show backend error alert
    const showError = () => (
        <div className='alert alert-danger align-middle' role="alert" style={{ display: error ? '' : 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            {error}
        </div>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Spinner />
        )

    return (
        <>
            <Navigation />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mx-auto mt-5'>
                        <div className='myform form'>
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1>Crear Cuenta</h1>
                                </div>
                            </div>
                            {showError()}
                            {showLoading()}
                            {signInForm()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;