import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import Navigation from '../../components/Navigation/Navigation';
import { getModulesHome, getCompleteLearn } from '../../api/apiCallsUser';
import useAuth from '../../auth/useAuth';

import { FaGraduationCap } from "react-icons/fa";
import Backdrops from '../../components/Backdrops/Backdrops';
import Section from '../../components/Section/Section';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './home.css';

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
        <div className='container'>
            <div class="alert alert-danger align-middle mt-5" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div className='row'>
                    <span>
                        Hubo un error al cargar los datos. Intente de nuevo.
                    </span>
                </div>
                <NavLink to='/learn' className='btn btn-info rounded-pill'><FaGraduationCap /> Ir a Lecciones</NavLink>
            </div>
        </div>
    )

    return (
        <>
            <Navigation />
            {isFetching && <Backdrops />}
            {error && showError()}
            <div className='container'>
                {data &&
                    data.map(module => (
                        <div key={module._id}>
                            <div className='row justify-content-center'>
                                <div className='col-2 col-sm-2 mt-3'>
                                    <p className='display-4 number-module rounded-circle text-center'>{module.number}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Section moduleId={module._id} completeLesson={completeLearn} />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Home;