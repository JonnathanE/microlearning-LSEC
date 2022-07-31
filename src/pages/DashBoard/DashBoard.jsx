import useAuth from '../../auth/useAuth';
import { NavLink } from 'react-router-dom';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import tw from 'twin.macro';
import { MdPersonOutline } from 'react-icons/md';
import { FaTable, FaList, FaPlus } from "react-icons/fa";

const TitleList = tw.p`
    text-sm font-bold text-gray-400 mt-[15px] mb-[5px]
`;

const ItemList = tw.li`
    flex items-center p-[5px] cursor-pointer hover:bg-bookmark-cyan-100 dark:hover:bg-gray-600
`;

const ItemTitle = tw.li`
    text-sm font-semibold text-gray-500 ml-[10px] dark:text-white
`;

const DashBoard = () => {

    const auth = useAuth();

    const original = () => (
        <div className='flex flex-col'>
            <h1 className='mb-3 text-center font-bold text-bookmark-cyan-500 text-xl'>
                Panel Administrativo
            </h1>
            <h2 className='mb-3 font-bold'>
                Bienvenido <span className='text-bookmark-cyan-400'>{auth?.user.name}</span>
            </h2>
            <div className='flex flex-col'>
                <ul>
                    <TitleList>Gestión de Módulos</TitleList>
                    <NavLink to='/admin/showmodules' className='list-group-item'>
                        <ItemList>
                            <FaTable />
                            <ItemTitle>Listar módulos</ItemTitle>
                        </ItemList>
                    </NavLink>
                    <NavLink to='/admin/module/create' className='list-group-item'>
                        <ItemList>
                            <FaPlus />
                            <ItemTitle>Crear módulo</ItemTitle>
                        </ItemList>
                    </NavLink>

                    <TitleList>LECCIONES</TitleList>
                    <NavLink to='/admin/showlessons'>
                        <ItemList>
                            <FaList />
                            <ItemTitle>Listar lecciones</ItemTitle>
                        </ItemList>
                    </NavLink>
                    <NavLink to='/admin/lesson/create'>
                        <ItemList>
                            <FaPlus />
                            <ItemTitle>Crear lección</ItemTitle>
                        </ItemList>
                    </NavLink>

                    <TitleList>CÁPSULAS</TitleList>
                    <NavLink to='/admin/showmicrolearnings' >
                        <ItemList>
                            <FaList />
                            <ItemTitle>Listar cápsulas</ItemTitle>
                        </ItemList>
                    </NavLink>
                    <NavLink to='/admin/micro/create'>
                        <ItemList>
                            <FaPlus />
                            <ItemTitle>Crear cápsula</ItemTitle>
                        </ItemList>
                    </NavLink>

                    <TitleList >TARJETAS</TitleList>
                    <NavLink to='/admin/showcards'>
                        <ItemList>
                            <FaList />
                            <ItemTitle>Listar tarjetas</ItemTitle>
                        </ItemList>
                    </NavLink>
                    <NavLink to='/admin/card/create'>
                        <ItemList>
                            <FaPlus />
                            <ItemTitle>Crear tarjeta</ItemTitle>
                        </ItemList>
                    </NavLink>

                    <TitleList >LISTS</TitleList>
                    <NavLink to='/admin/showusers'>
                        <ItemList>
                            <MdPersonOutline />
                            <ItemTitle>Usuarios</ItemTitle>
                        </ItemList>
                    </NavLink>
                </ul>
            </div>
        </div>
    )

    return (
        <LayoutAdmin>
            <div className='p-10 dark:text-white'>
                {original()}
            </div>
        </LayoutAdmin>
    )
}

export default DashBoard;