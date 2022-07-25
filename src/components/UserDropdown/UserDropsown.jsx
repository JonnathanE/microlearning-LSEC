import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import useAuth from '../../auth/useAuth';

import avatar from '../../img/user-avatar.png';

const UserDropsown = () => {

    const [showOptions, setShowOptions] = useState(false);

    const auth = useAuth();

    const handleClick = () => {
        setShowOptions(!showOptions)
    }

    const handleClickAway = () => {
        setShowOptions(false)
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={handleClick} type="button" className="inline-flex justify-center items-center w-full shadow-sm px-1 py-0 mx-1 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-white" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <img className="w-10 h-10 rounded-full object-cover" src={avatar} alt="Extra small avatar" />
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                {showOptions &&
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div className="py-1 border-b" role="none">
                            <div className="flex gap-3 items-center px-4 py-2">
                                <img className="w-10 h-10 rounded-full object-cover" src={avatar} alt="Extra small avatar" />
                                <div className="flex flex-col truncate">
                                    <span className="font-bold text-ellipsis overflow-hidden ...">{auth?.user.name}</span>
                                    <NavLink to='/' className="text-bookmark-cyan-500">Ver perfil</NavLink>
                                </div>
                            </div>
                            <NavLink to='/' class="text-gray-700 block px-4 py-2 text-sm hover:bg-cyan-50" role="menuitem" tabindex="-1" id="menu-item-0">Configuración</NavLink>
                        </div>
                        <div class="py-1" role="none">
                            <Link to='' onClick={auth.logout} class="text-gray-700 block px-4 py-2 text-sm hover:bg-cyan-50" role="menuitem" tabindex="-1" id="menu-item-1">Cerrar sesión</Link>
                        </div>
                    </div>
                }
            </div>
        </ClickAwayListener>
    );
}

export default UserDropsown;
