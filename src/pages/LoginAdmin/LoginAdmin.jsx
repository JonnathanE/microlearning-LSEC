import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginAdmin } from '../../api/apiCallsAdmin.js';
import tw from 'twin.macro';
import useAuth from '../../auth/useAuth';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import Alert from '../../components/Alert/Alert';
import lockIcon from '../../img/lock.svg';
import emailIcon from '../../img/email.svg';

const FormGroup = tw.div`
    pt-6
`;

const InputWrapper = tw.div`
    flex overflow-hidden items-center mt-2 w-full rounded-lg border border-gray-400 transition-all focus-within:shadow-lg focus-within:border-bookmark-cyan-500
`;

const IconWrapper = tw.div`
    flex justify-center items-center pl-6
`;

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
        email: yup.string().email().required("El correo electrónico es requerido"),
        password: yup.string().required("La contraseña es un campo requerido"),
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
        <form onSubmit={handleSubmit(clickSubmit)}>
            <div>
                <label className="font-light text-gray-800 dark:text-white">Correo electrótrico</label>
                <InputWrapper>
                    <IconWrapper>
                        <img src={emailIcon} alt='correo icono' className='w-6 h-6 pointer-events-none' />
                    </IconWrapper>
                    <input type="email" {...register('email')} className='px-4 py-4.5 w-full focus:outline-none font-light border-0 focus:ring-0 dark:bg-gray-800' aria-label='email' />
                </InputWrapper>
                {errors.email && errorValidator(errors.email.message)}
            </div>
            <FormGroup>
                <label className="font-light text-gray-800 dark:text-white">Contraseña</label>
                <InputWrapper>
                    <IconWrapper>
                        <img src={lockIcon} alt='contraseña icono' className='w-6 h-6 pointer-events-none' />
                    </IconWrapper>
                    <input type="password" {...register('password')} className='px-4 py-4.5 w-full focus:outline-none font-light border-0 focus:ring-0 dark:bg-gray-800' aria-label='password' />
                </InputWrapper>
                {errors.password && errorValidator(errors.password.message)}
            </FormGroup>
            <div className='pt-8'>
                <input type='submit' className="py-4 px-8 w-full text-white bg-bookmark-cyan-500 rounded-lg shadow-lg hover:bg-bookmark-cyan-400 focus:ring-4 focus:ring-cyan-100 focus:outline-none" value='Iniciar sesión' aria-label='iniciar sesion' data-testid='form-login-admin-button' />
            </div>
        </form>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Modal>
                <Loader />
            </Modal>
        )

    return (
        <>
            <div className="w-full min-h-screen font-sans text-gray-900 dark:bg-gray-800">
                <div className='flex flex-col items-center py-5 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24'>
                    <h1 className="my-5 font-bold text-xl text-center dark:text-white">Inicio de sesión para administrador</h1>
                    {error && <div className='pt-1'><Alert severity='error'>{error}</Alert></div>}
                    {showLoading()}
                    <div className='w-80 border border-gray-400 rounded-lg px-3 py-8'>
                        {signInForm()}
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginAdmin;