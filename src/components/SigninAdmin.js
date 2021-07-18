import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Redirect } from 'react-router-dom';
import { signin } from '../core/apiCore'

const SigninAdmin = (req, res) => {
    // // state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

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
        signin()
        const resData = await signin(data);
        if (resData.error) {
            setError(resData.error);
            setLoading(false);
            console.log(resData.error)
        } else {
            console.log(resData)
        }
    }

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <span class="helper-text" style={{ color: '#ff0000' }}>{messageError}</span>
    )

    const signInForm = () => (
        <form onSubmit={handleSubmit(clickSubmit)}>
            <div className='input-field'>
                <i className="material-icons prefix">account_circle</i>
                <label htmlFor="input_emailAdmin">Correo electrónico</label>
                <input type='email' id="input_emailAdmin" {...register('email')} className='validate' />
                {errors.email && errorValidator('el correo electrónico debe ser un correo electrónico válido')}
            </div>
            <div className='input-field'>
                <i className="material-icons prefix">password</i>
                <label htmlFor="intput_passwordAdmin">Contraseña</label>
                <input type='password' id="intput_passwordAdmin" {...register('password')} className='validate' />
                {errors.password && errorValidator('la contraseña es un campo requerido')}
            </div>
            <button type='submit' className='btn waves-effect waves-light'>Enviar<i className="material-icons right">send</i></button>
        </form>
    )

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col s12 l6'>
                        <h4 className="center-align">Iniciar sesión para Administrador</h4>
                        {signInForm()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SigninAdmin;