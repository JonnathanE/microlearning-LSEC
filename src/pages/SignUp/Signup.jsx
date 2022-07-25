import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { signupUser } from '../../api/apiCallsUser';
import tw from 'twin.macro';
import useAuth from '../../auth/useAuth';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import Alert from '../../components/Alert/Alert';
import { useLottie } from "lottie-react";
import animationBg from '../../animation/107800-login-leady.json';
// import ToggleDarkMode from '../../components/ToggleDarkMode/ToggleDarkMode';

import { AiOutlineUser } from 'react-icons/ai';
import backgroundLsec from '../../img/logo_lsec.png';
import lockIcon from '../../img/lock.svg';
import emailIcon from '../../img/email.svg';
// import googleIcon from '../../img/google.svg';
// import facebookIcon from '../../img/facebook.svg';


const FormGroup = tw.div`
    pt-6
`;

const InputWrapper = tw.div`
    flex overflow-hidden items-center mt-2 w-full rounded-lg border border-gray-400 transition-all focus-within:shadow-lg focus-within:border-bookmark-cyan-500
`;

const IconWrapper = tw.div`
    flex justify-center items-center pl-6
`;

const Signup = () => {
    // state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const previusObjectUrl = location.state?.from;

    // lottie configuration
    const options = {
        animationData: animationBg,
        loop: true
    };
    const { View } = useLottie(options);

    // yup schema to validate inputs
    const schema = yup.object().shape({
        email: yup.string().email('El correo electrónico debe ser un correo electrónico válido').required('El correo electrónico es un campo obligatorio'),
        password: yup.string().required('La contraseña es un campo requerido'),
        name: yup.string().required('El nombre es un campo obligatorio')
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
            const res = await signupUser(data);
            auth.login(res);
            history.push(previusObjectUrl || '/learn')
        } catch (error) {
            setError(error.response?.data?.message);
            setLoading(false);
        }
    };

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const signInForm = () => (
        <form onSubmit={handleSubmit(clickSubmit)}>
            <FormGroup>
                <label className="font-light text-gray-800 dark:text-white">Nombre</label>
                <InputWrapper>
                    <IconWrapper>
                        <AiOutlineUser className='w-6 h-6 pointer-events-none text-gray-500' />
                    </IconWrapper>
                    <input type="text" {...register('name')} className='px-4 py-4.5 w-full focus:outline-none font-light border-0 focus:ring-0 dark:bg-gray-800' data-testid='name' />
                </InputWrapper>
                {errors.name && errorValidator(errors.name.message)}
            </FormGroup>
            <FormGroup>
                <label className="font-light text-gray-800 dark:text-white">Correo electrónico</label>
                <InputWrapper>
                    <IconWrapper>
                        <img src={emailIcon} alt='correo icono' className='w-6 h-6 pointer-events-none' />
                    </IconWrapper>
                    <input type="email" {...register('email')} className='px-4 py-4.5 w-full focus:outline-none font-light border-0 focus:ring-0 dark:bg-gray-800' data-testid='email' />
                </InputWrapper>
                {errors.email && errorValidator(errors.email.message)}
            </FormGroup>
            <FormGroup>
                <label className="font-light text-gray-800 dark:text-white">Contraseña</label>
                <InputWrapper>
                    <IconWrapper>
                        <img src={lockIcon} alt='contraseña icono' className='w-6 h-6 pointer-events-none' />
                    </IconWrapper>
                    <input type="password" {...register('password')} className='px-4 py-4.5 w-full focus:outline-none font-light border-0 focus:ring-0 dark:bg-gray-800' data-testid='password' />
                </InputWrapper>
                {errors.password && errorValidator(errors.password.message)}
            </FormGroup>
            <div className='pt-8'>
                <input type='submit' className="py-4 px-8 w-full text-white bg-bookmark-cyan-500 rounded-lg shadow-lg hover:bg-bookmark-cyan-400 focus:ring-4 focus:ring-cyan-100 focus:outline-none" value='Regístrate' data-testid='btnSubmit' />
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
        <div className='flex justify-between min-h-screen font-sans text-gray-900 dark:text-white dark:bg-gray-800'>

            {showLoading()}

            <div className='hidden relative w-1/2 bg-center bg-no-repeat lg:flex text-center' style={{ backgroundImage: `url(${backgroundLsec})` }}>
                {View}
            </div>

            <div className='flex-1 mx-auto max-w-2xl'>
                <div className='flex flex-col px-8 pt-10 lg:px-14 xl:px-24'>
                    <NavLink exact to='/' className='text-3xl md:text-4xl font-bold tracking-wide dark:text-white self-center md:self-end'>
                        LS<span className='text-bookmark-cyan-500'>EC</span>
                    </NavLink>
                    {/* <div className='pt-5 self-center md:self-end'>
                        <ToggleDarkMode />
                    </div> */}
                    <div className='pt-20 pb-6'>
                        <h1 className="text-3xl font-bold tracking-wide leading-loose whitespace-nowrap">
                            A registrarnos!
                        </h1>
                        <span className="font-light text-gray-500 dark:text-gray-400">
                            Regístrate para aprender Lengua de Señas Ecuatoriana.
                        </span>

                        {error && <div className='pt-5'><Alert severity='error'>{error}</Alert></div>}


                        {signInForm()}
                        <div class="pt-4">
                            <div class="font-light text-center text-gray-500 dark:text-gray-400">
                                ¿Tienes una cuenta?
                                <NavLink to='/signin' class="font-normal text-teal-500 hover:text-teal-600">
                                    Inicia sesión
                                </NavLink>
                            </div>
                            <div
                                class="flex flex-wrap gap-y-2 justify-between items-center pt-14 text-center whitespace-nowrap"
                            >
                                <span class="flex-1 text-gray-500 dark:text-gray-400">© 2021 JEDE. All rights reserved.</span>
                                {/* <span class="flex flex-1 justify-center items-center space-x-1">
                                    <a href="#" class="text-gray-500 hover:text-gray-600">Terms of Service</a>
                                    <span class="text-gray-500">&#183;</span>
                                    <a href="#" class="text-gray-500 hover:text-gray-600">Privacy Policy</a>
                                </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;