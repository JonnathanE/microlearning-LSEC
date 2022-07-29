
import { IconContext } from "react-icons";
import { NavLink, Link } from 'react-router-dom';
import tw from 'twin.macro';
import useAuth from '../../auth/useAuth';
import { MdAccountCircle, MdDashboard, MdExitToApp, MdPersonOutline, MdSettingsApplications } from 'react-icons/md';
import { FaList, FaPlus } from "react-icons/fa";

const SidebarContainer = tw.div`
flex-1 border-r-[0.5px] border-gray-200 min-h-screen bg-white dark:bg-gray-800
`;

const SidebarTop = tw.div`
h-[50px] flex items-center justify-center
`;

const Logo = tw.span`
text-xl font-bold text-bookmark-cyan-500
`;

const SidebarCenter = tw.div`
pl-[10px]
`;

const TitleList = tw.p`
    text-sm font-bold text-gray-400 mt-[15px] mb-[5px]
`;

const ItemList = tw.li`
    flex items-center p-[5px] cursor-pointer hover:bg-bookmark-cyan-100 dark:hover:bg-gray-600
`;

const ItemTitle = tw.li`
    text-sm font-semibold text-gray-500 ml-[10px] dark:text-white
`;

const SidebarBottom = tw.div`
flex items-center m-[10px]
`;

const Sidebar = () => {

    const auth = useAuth();

    return (
        <IconContext.Provider value={{ className: "text-lg text-bookmark-cyan-500" }}>
            <SidebarContainer>
                <SidebarTop>
                    <Logo>LSEC</Logo>
                </SidebarTop>
                <hr className="h-0 border-[0.5px] border-gray-200" />
                <SidebarCenter>
                    <ul className="m-0 p-0">

                        <TitleList >MAIN</TitleList>
                        <NavLink exact to='/admin/dashboard'>
                            <ItemList>
                                <MdDashboard />
                                <ItemTitle>Dashboar</ItemTitle>
                            </ItemList>
                        </NavLink>

                        <TitleList >LISTS</TitleList>
                        <NavLink to='/admin/showusers'>
                            <ItemList>
                                <MdPersonOutline />
                                <ItemTitle>Usuarios</ItemTitle>
                            </ItemList>
                        </NavLink>

                        <TitleList>MÓDULOS</TitleList>
                        <NavLink to='/admin/showmodules'>
                            <ItemList>
                                <FaList />
                                <ItemTitle>Listar Módulos</ItemTitle>
                            </ItemList>
                        </NavLink>
                        <NavLink to='/admin/module/create'>
                            <ItemList>
                                <FaPlus />
                                <ItemTitle>Crear Módulo</ItemTitle>
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

                        <TitleList >USER</TitleList>
                        <ItemList>
                            <MdAccountCircle />
                            <ItemTitle>Perfil</ItemTitle>
                        </ItemList>
                        <ItemList>
                            <MdSettingsApplications />
                            <ItemTitle>Configuración</ItemTitle>
                        </ItemList>
                        <Link to='' onClick={auth?.logout}>
                            <ItemList>
                                <MdExitToApp />
                                <ItemTitle>Cerrar sesión</ItemTitle>
                            </ItemList>
                        </Link>
                    </ul>
                </SidebarCenter>
                <SidebarBottom>
                    <div className='w-5 h-5 m-[5px] rounded-lg border border-bookmark-cyan-500 cursor-pointer bg-white'></div>
                    <div className='w-5 h-5 m-[5px] rounded-lg border border-bookmark-cyan-500 cursor-pointer bg-gray-500'></div>
                </SidebarBottom>
            </SidebarContainer>
        </IconContext.Provider>
    );
}

export default Sidebar;
