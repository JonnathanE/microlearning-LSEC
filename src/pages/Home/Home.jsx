import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import tw, { styled } from 'twin.macro';
import { getModulesHome, getCompleteLearn } from '../../api/apiCallsUser';
import useAuth from '../../auth/useAuth';
import Navbar from '../../components/Navbar/Navbar';
import Alert from '../../components/Alert/Alert';

import { FaGraduationCap } from "react-icons/fa";
import starIcon from '../../img/star.svg';
import Backdrops from '../../components/Backdrops/BackdropTW';
import Section from '../../components/Section/Section';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Content = styled.div`
    ${tw`
            w-full min-h-screen font-sans text-gray-900 dark:bg-gray-800
        `
    }
    ${({ active }) => active ? tw`overflow-hidden h-screen` : tw``}
`;

const Home = () => {

    const auth = useAuth();
    const MySwal = withReactContent(Swal);

    const [completeLearn, setCompleteLearn] = useState([]);

    const { data, error, isFetching } = useQuery(["home", "modules"], getModulesHome);

    const loadCompleteLearn = async () => {
        try {
            const res = await getCompleteLearn(auth.user.token);
            setCompleteLearn(res.lesson);
        } catch (error) {
            console.log(error)
            if (error.response?.status === 401) {
                MySwal.fire({
                    title: 'Sesión Acabada',
                    icon: 'info',
                    showCloseButton: true,
                    text: 'Usted puede seguir navegando en la página, pero su progreso no se guardarán. Le recomendamos iniciar sesión.',
                    confirmButtonText: 'Iniciar Sesión'
                }).then(response => {
                    if (response.isConfirmed) {
                        auth.logout();
                    }
                })
            }
        }
    }

    useEffect(() => {
        loadCompleteLearn();
    }, []);

    // show backend error alert
    const showError = () => (
        <Alert severity='error'>
            <div className='flex flex-col gap-2'>
                <span>
                    Hubo un error al cargar los datos. Intente de nuevo.
                </span>
                <NavLink to='/learn' className='flex justify-center items-center gap-2 w-full sm:w-48 h-11 px-8 font-medium border border-red-700 rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300'><FaGraduationCap /> Ir a Lecciones</NavLink>
            </div>
        </Alert>
    )

    return (
        <Content active={false}>

            <Navbar activeMenu="Learn" />

            {isFetching && <Backdrops />}
            {error && showError()}

            <div className='flex flex-wrap-reverse gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24'>

                <div className='relative z-10 w-full md:w-3/4'>

                    {data &&
                        data.map(module => (
                            <div key={module._id} className='flex flex-col sm:mr-7 items-center mb-10'>
                                <div className='relative w-[90px] h-[90px]  rounded-full flex justify-center items-center'>
                                    <img src={starIcon} alt="" className='absolute' />
                                    <p className='text-xl font-bold z-10'>{module.number}</p>
                                </div>
                                <div className='w-full lg:max-w-full mt-2 px-3 py-6 overflow-hidden  dark:bg-gray-700 border rounded-lg shadow-lg border-gray-300'>
                                    <Section moduleId={module._id} completeLesson={completeLearn} />
                                </div>
                            </div>
                        ))}
                </div>
                <div className='hidden relative w-full md:w-1/4 md:flex flex-col justify-between'>
                    <div className='w-full px-3 py-3 border border-gray-200 rounded-lg drop-shadow-lg'>
                        <h2 className='font-bold text-start dark:text-white'>Titulo</h2>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default Home;