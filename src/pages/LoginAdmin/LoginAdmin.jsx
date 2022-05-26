import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginAdmin } from '../../api/apiCallsAdmin.js';

import useAuth from '../../auth/useAuth';
import Spinner from '../../components/Spinner/Spinner';

import './loginAdmin.css';

const LoginAdmin = () => {
    // state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
    const clickSubmit = async data => {
        setError(false);
        setLoading(true);
        try {
            const res = await loginAdmin(data)
            if (res.role) {
                if (res.role[0] === 'admin') {
                    setLoading(false);
                    auth.login(res);
                    auth.role(1);
                    history.push(previusObjectUrl || '/admin/dashboard')
                }
            } else {
                setLoading(false);
                setError('No admitido');
            }
        } catch (error) {
            setLoading(false);
            setError("El correo electrónico o la contraseña no coinciden");
        }
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
                <input type="email" {...register('email')} className='form-control' aria-label='email' />
                {errors.email && errorValidator(errors.email.message)}
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Password</label>
                <input type="password" {...register('password')} className='form-control' aria-label='password' />
                {errors.password && errorValidator(errors.password.message)}
            </div>
            <input type='submit' className="btn btn-primary" aria-label='iniciar sesion' />
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
            <div className="mt-5">
                <h4 className="text-center mb-5">Log In</h4>
                {showError()}
                {showLoading()}
                {signInForm()}
            </div>

        </>
    )
}

export default LoginAdmin;