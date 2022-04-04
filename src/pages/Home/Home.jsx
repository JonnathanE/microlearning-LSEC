import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Navigation from '../../components/Navigation/Navigation';
import { getModulesHome, getCompleteLearn } from '../../api/apiCallsUser';
import useAuth from '../../auth/useAuth';


import Section from '../../components/Section/Section';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './home.css';

const Home = () => {

    const auth = useAuth();

    const [completeLearn, setCompleteLearn] = useState([]);

    const { data, error, isFetching } = useQuery(["home", "modules"], getModulesHome);

    const MySwal = withReactContent(Swal);

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

    return (
        <>
            <Navigation />
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