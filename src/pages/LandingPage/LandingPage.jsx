import { NavLink } from 'react-router-dom';
import useAuth from '../../auth/useAuth';
import tw, { styled } from 'twin.macro';
import Navbar from '../../components/Navbar/Navbar';

import logoFenasec from '../../img/logo_fenasec.png';
import logoAscLoja from '../../img/asociacion-sordos-loja.jpg';
import logoUNL from '../../img/logo_unl.png';
import logoLSEC from '../../img/logo_lsec.png';
import starIcon from '../../img/star.svg';

const Content = styled.div`
    ${tw`
            w-full min-h-screen font-sans text-gray-900 dark:bg-gray-800
        `
    }
    ${({ active }) => active ? tw`overflow-hidden h-screen` : tw``}
`;

const ImagesCardContainer = tw.div`
    w-13 h-13 rounded-full border-4 border-white object-cover overflow-hidden
`;

const LandingPage = () => {

    const auth = useAuth();

    return (
        <Content active={false}>

            <Navbar activeMenu="Home" />

            <div className='flex flex-wrap-reverse gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24'>

                <div className='relative z-10 md:w-1/2 w-full'>
                    <span className='font-medium px-1 text-xl text-bookmark-cyan-500'>Ahora de aprender algo nuevo</span>
                    <h1 className='pt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight whitespace-nowrap dark:text-white'>
                        Aprende <br />Lengua de Señas <br />Ecuatoriana
                        {/* <span className='whitespace-nowrap text-bookmark-cyan-500'> Lengua de Señas <br />Ecuatoriana<br /></span> */}
                    </h1>
                    <p className='pt-8 sm:text-lg max-w-md font-normal text-gray-600 dark:text-gray-400 leading-relaxed'>
                        Aprende vocavulario básico de lengua de señas mediante cápsulas de aprendizaje
                    </p>
                    <div className="flex pt-8 space-x-4 sm:space-x-6">
                        {!auth?.isLogged() && <>
                            <NavLink to='/signin'
                                className="flex justify-center items-center w-full sm:w-auto h-13 px-8 bg-bookmark-cyan-500 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300"
                            >
                                Iniciar sesión
                            </NavLink>
                            <NavLink to='/signup'
                                className="flex justify-center items-center w-full sm:w-auto h-13 px-8 font-medium text-gray-900 dark:text-white border border-gray-900 dark:border-white rounded-xl whitespace-nowrap hover:shadow-xl dark:hover:shadow-secondary transition-shadow duration-300"
                            >
                                Crear cuenta
                            </NavLink>
                        </>}
                    </div>
                    <div className="flex pt-20">
                        {/* <img className="w-24" src="/img/chef.png" alt="" /> */}
                        <div className="pt-5 pl-3">
                            <div className="text-xl font-bold leading-relaxed dark:text-white">Vocavulario y frases</div>
                            <div className="inline-flex text-gray-600 dark:text-gray-400 leading-relaxed">
                                A la gente le gusta aprender algo nuevo
                            </div>
                            <div className="font-bold text-bookmark-cyan-500 leading-relaxed">80+ palabras</div>
                        </div>
                    </div>
                    <div>
                        <div className="flex md:hidden pt-8 justify-end space-x-1 font-bold dark:text-white">
                            <span>Creado por JEDE</span>
                        </div>
                    </div>
                </div>

                <div className='relative md:w-1/2 w-full flex flex-col justify-between'>

                    <img src={logoLSEC} alt='logo lsec' className='w-96 lg:w-full drop-shadow-2xl self-center lg:self-end' />

                    <div className='absolute right-0 lg:-right-6 top-0 lg:top-28 flex flex-col py-5 px-7 rounded-2xl shadow-xl bg-white/80 backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300'>
                        <div className='flex -space-x-3'>
                            <ImagesCardContainer>
                                <img src={logoUNL} alt='logo unl' />
                            </ImagesCardContainer>
                            <ImagesCardContainer>
                                <img src={logoFenasec} alt='logo fenasec' />
                            </ImagesCardContainer>
                            <ImagesCardContainer>
                                <img src={logoAscLoja} alt='logo lsec' />
                            </ImagesCardContainer>
                        </div>
                        <div className="pt-3 font-bold">Clientes felices</div>
                        <div className="flex items-center text-gray-600 leading-relaxed">
                            <img src={starIcon} alt='icono estrella' className="w-5 h-5" />
                            <span className="pl-1">4.9 (+2.5k Ratings)</span>
                        </div>
                    </div>

                    <div className='absolute left-0 bottom-0 md:bottom-32 lg:bottom-16 flex bg-white/80 rounded-2xl shadow-xl backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300'>
                        {/* <img className="w-auto h-20 self-end" src="/img/driver.png" alt="" /> */}
                        <div className="pr-7 pl-2 py-5">
                            <div className="font-bold">Aprendizaje rápido</div>
                            <div className="text-gray-600 leading-relaxed">Dedica 5 mins al día 🚀</div>
                        </div>
                    </div>

                    <div className="hidden md:flex justify-end space-x-1 font-bold dark:text-white">
                        <span>Creado por JEDE</span>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default LandingPage;