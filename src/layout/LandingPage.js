import React from 'react';
import Navigation from './Navigation';
import { NavLink } from 'react-router-dom';

import './LandingPage.css';
import logoFenasec from '../img/logo_fenasec.png';
import logoUNL from '../img/logo_unl.png';
import logoLSEC from '../img/logo_lsec.png';

const LandingPage = (req, res) => {

    return (
        <>
            <Navigation />
            <section id='hero' className='container'>
                <div className='row g-0 h-100'>
                    <div className='col-lg-6 d-flex'>
                        <div className='content mx-auto align-self-center px-4 my-5'>
                            <div>
                                <small className='d-block text-primary mb-3'>Ahora de aprender algo nuevo</small>
                                <h1 className='display-4 fw-bold mb-4'>Aprende Lengua de Señas Ecuatoriana</h1>
                                <p className='lead mb-4'>Aprender lengua de señas, da una nueva oportunidad</p>
                                <NavLink to='/signup' className='btn btn-primary'>Crear tu cuenta hoy</NavLink>
                                <div className='d-flex mt-5'>
                                    <div className='d-flex me-4'>
                                        <img src={logoFenasec} className='logo me-3' alt='logo fenasec'/>
                                        <div>
                                            <small>Visita</small>
                                            <p className='fw-bold mb-0'>FENASEC</p>
                                        </div>
                                    </div>
                                    <div className='d-flex me-4'>
                                        <img src={logoUNL} className='logo me-3' alt='logo unl'/>
                                        <div>
                                            <small>Visita</small>
                                            <p className='fw-bold mb-0'>UNL</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 d-flex bg-light'>
                        <div className='content mx-auto align-self-center px-4 my-5'>
                            <img src={logoLSEC} alt='logo lsec' className='img-fluid'/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage;