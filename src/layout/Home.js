import React, { useState, useEffect } from 'react';
import Navigation from '../layout/Navigation';
import { getModules, deleteModule, home } from '../core/apiCore';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Section from '../components/Section';

import './Home.css';

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

                    <div key={i}>

                        <div className='row justify-content-center'>
                            <div className='col-2 col-sm-2 mt-3'>
                                <p className='display-4 number-module rounded-circle text-center'>{module.number}</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-sm-12'>
                                <Section module={module} />
                            </div>
                        </div>

                    </div>

                ))}

            </div>
        </>
    )
}

export default Home;