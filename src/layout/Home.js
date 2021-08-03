import React, { useState, useEffect } from 'react';
import Navigation from '../layout/Navigation';
import { getModules, deleteModule, home } from '../core/apiCore';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Card from '../components/Card';

const Home = () => {

    // state
    const [modules, setModules] = useState([]);

    const auth = useAuth();

    const MySwal = withReactContent(Swal);

    const loadModules = () => {
        home().then(data => {
            if (data.error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            } else {
                setModules(data);
                console.log(modules);
            }
        });
    }

    useEffect(() => {
        loadModules();
    }, [])

    return (
        <>
            <Navigation />
            <div className='container'>
                {modules.map((module, i) => (
                    <div key={i} className='row'>
                        <h2>{module.number}</h2>
                        <div className='col-sm-12'>
                            <Card module={module}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;