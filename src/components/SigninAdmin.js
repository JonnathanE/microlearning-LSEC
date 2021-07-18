import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { authenticateAdmin, signin } from '../core/apiCore'
import useAuth from '../auth/useAuth';
import Loading from './Loading';

import './Signin.css';

const SigninAdmin = (req, res) => {
    // // state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const previusObjectUrl = location.state?.from;

    // yup schema to validate inputs
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit method
    const clickSubmit = data => {
        setError(false);
        setLoading(true);
        signin(data)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setLoading(false);
                } else {
                    if (authenticateAdmin(data)) {
                        auth.login(data);
                        history.push(previusObjectUrl || '/admin/dashboard')
                    } else {
                        setError('No admitido');
                        setLoading(false);
                    }
                }
            });
    };

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const signInForm = () => (
        <form className="sign-box" onSubmit={handleSubmit(clickSubmit)}>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" {...register('email')} className='form-control' />
                {errors.email && errorValidator(errors.email.message)}
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" {...register('password')} className='form-control' />
                {errors.password && errorValidator(errors.password.message)}
            </div>
            <input type='submit' className="btn btn-primary" />
        </form>
    )

    // show backend error alert
    const showError = () => (
        <div className='alert alert-danger' role="alert" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Loading />
        )

    return (
        <>
            <div className="mt-5">
                <h4 className="text-center mb-5">Log In</h4>
                {showError()}
                {showLoading()}
                {signInForm()}
            </div>
        </>
    )
}

export default SigninAdmin;