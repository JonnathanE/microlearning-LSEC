import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import ToggleDarkMode from '../ToggleDarkMode/ToggleDarkMode';
import UserDropdown from '../UserDropdown/UserDropsown';
import useAuth from '../../auth/useAuth';

import { FaGraduationCap, FaTrophy, FaHome, FaSignOutAlt } from "react-icons/fa";
import avatar from '../../img/user-avatar.png';

/** 
 * TODO: Crear la funcionalidad de obtener datos del usuario desde la API
 * TODO: Obtener datos del usuario desde la API y agregar la imagen del usuario
 * ! el el menu de hamburguesa al presionar click en home, no se cierra el menu
*/

const NavMenu = styled.div`
    ${tw`
            inset-0 transition-all z-20 md:static md:bg-transparent md:flex items-center justify-center space-y-8 md:space-y-0 md:space-x-8 flex-col md:flex-row lg:space-x-14
        `
    }
    ${({ active }) => active ? tw`fixed flex` : tw`hidden`}
`;

const NavItemWrapper = styled.div`
    ${tw`
            flex items-center gap-2
        `
    }
`;

const NavItem = styled.li`
    ${tw`
            text-lg md:text-base lg:text-lg font-medium
        `
    }
    ${({ active }) => active && tw`text-bookmark-cyan-500`}
`;

const Navbar = ({ activeMenu = "Home" }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const auth = useAuth();

    return (
        <nav className='flex justify-between items-center py-8 px-6 mx-auto max-w-screen-xl md:px-12 lg:px-16 xl:px-24 '>
            <NavLink exact to='/learn' className='text-3xl md:text-4xl font-bold tracking-wide dark:text-white'>
                LS<span className='text-bookmark-cyan-500'>EC</span>
            </NavLink>
            <NavMenu active={sidebarOpen} className='bg-withe/70 backdrop-blur-xl dark:bg-gray-800/90'>
                <ul className='flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 lg:md:-x-8 dark:text-white'>

                    {auth?.isLogged() &&
                        <div className="flex gap-3 items-center px-4 py-2 sm:hidden">
                            <img className="w-10 h-10 rounded-full object-cover" src={avatar} alt="Extra small avatar" />
                            <div className="flex flex-col truncate">
                                <span className="font-bold text-ellipsis overflow-hidden ...">{auth?.user.name}</span>
                                <NavLink to='/' className="text-bookmark-cyan-500">Ver perfil</NavLink>
                            </div>
                        </div>
                    }

                    <NavItem active={activeMenu === 'Home'} className='group'>
                        <NavItemWrapper>
                            <FaHome />
                            <NavLink to='/'>Home</NavLink>
                        </NavItemWrapper>
                        <div className='h-0.5 bg-bookmark-cyan-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out'></div>
                    </NavItem>
                    {auth?.isLogged()
                        ? <>
                            <NavItem active={activeMenu === 'Learn'} className='group'>
                                <NavItemWrapper>
                                    <FaGraduationCap />
                                    <NavLink to='/learn'>Aprender</NavLink>
                                </NavItemWrapper>
                                <div className='h-0.5 bg-bookmark-cyan-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out'></div>
                            </NavItem>
                            <NavItem active={activeMenu === 'Progress'} className='group'>
                                <NavItemWrapper>
                                    <FaTrophy />
                                    <NavLink to='/learn/progress'>Progreso</NavLink>
                                </NavItemWrapper>
                                <div className='h-0.5 bg-bookmark-cyan-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out'></div>
                            </NavItem>
                            <li className='group text-lg md:hidden font-medium'>
                                <NavItemWrapper>
                                    <FaSignOutAlt />
                                    <Link to='' onClick={auth.logout}>Cerrar sesión</Link>
                                </NavItemWrapper>
                                <div className='h-0.5 bg-bookmark-cyan-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out'></div>
                            </li>
                        </>
                        :
                        <>
                            <NavLink to='/signin'
                                className="flex justify-center items-center w-full sm:hidden h-13 px-3 font-medium text-bookmark-cyan-500 dark:text-white  whitespace-nowrap "
                            >
                                Iniciar sesión
                            </NavLink>
                            <NavLink to='/signup' className='flex justify-center items-center h-13 px-3 font-medium text-white bg-bookmark-cyan-500 rounded-xl hover:shadow-primary transition-shadow duration-300 whitespace-nowrap sm:hidden'>
                                Crear cuenta
                            </NavLink>
                        </>
                    }
                </ul>
            </NavMenu>
            <div className='hidden md:flex md:flex-row items-center md:space-y-0 md:space-x-1'>
                {auth?.isLogged()
                    ? <UserDropdown />
                    :
                    <>
                        <ToggleDarkMode />
                        <NavLink to='/signin'
                            className="flex justify-center items-center w-full sm:w-auto h-13 px-3 font-medium text-bookmark-cyan-500 dark:text-white  whitespace-nowrap "
                        >
                            Iniciar sesión
                        </NavLink>
                        <NavLink to='/signup' className='flex justify-center items-center h-13 px-3 font-medium text-white bg-bookmark-cyan-500 rounded-xl hover:shadow-primary transition-shadow duration-300 whitespace-nowrap'>
                            Crear cuenta
                        </NavLink>
                    </>
                }
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="block md:hidden relative z-30">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current text-gray-900 dark:text-white">
                    <rect x="4" y="6" width="7" height="2" rx="1" />
                    <rect x="13" y="16" width="7" height="2" rx="1" />
                    <rect x="4" y="11" width="16" height="2" rx="1" />
                </svg>
            </button>
        </nav>
    );
}

export default Navbar;
