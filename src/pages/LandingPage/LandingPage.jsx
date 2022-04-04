import { NavLink, Link } from 'react-router-dom';

import Navigation from '../../components/Navigation/Navigation';

import './landingPage.css';
import logoFenasec from '../../img/logo_fenasec.png';
import logoUNL from '../../img/logo_unl.png';
import logoLSEC from '../../img/logo_lsec.png';

const LandingPage = () => {

    return (
        <>
            <Navigation />
            <section className='container'>
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
                                        <img src={logoFenasec} className='logo me-3' alt='logo fenasec' />
                                        <div>
                                            <small>Visita</small>
                                            <p className='fw-bold mb-0'>FENASEC</p>
                                        </div>
                                    </div>
                                    <div className='d-flex me-4'>
                                        <img src={logoUNL} className='logo me-3' alt='logo unl' />
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
                            <img src={logoLSEC} alt='logo lsec' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </section>

            <section className='d-flex'>
                <div className='container align-self-center'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='content mx-auto px-4 my-5'>
                                <img src={logoFenasec} className='' alt='logo unl' />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='align-self-center my-4 px-4'>
                                <h1 className='display-4 fw-bold mb-5'>Construye un Ecuador Inclusivo</h1>
                                <ul className='list-unstyled'>
                                    <li className='d-flex mb-4'>
                                        <p className='text-primary lead fw-bold step'>01</p>
                                        <div className='ms-3'>
                                            <p className='lead fw-bold'>Crea tu cuenta<span className='text-primary'>.</span></p> <p>Es muy sencillo, solamente ingresa tu correo electrónico y listo.</p>
                                        </div>
                                    </li>
                                    <li className='d-flex mb-4'>
                                        <p className='text-primary lead fw-bold step'>02</p>
                                        <div className='ms-3'>
                                            <p className='lead fw-bold'>Inicia tu aprendizaje<span className='text-primary'>.</span></p> <p>Ingresa con tu cuenta y selecciona una lección que desea aprender.</p>
                                        </div>
                                    </li>
                                    <li className='d-flex mb-4'>
                                        <p className='text-primary lead fw-bold'>03</p>
                                        <div className='ms-3'>
                                            <p className='lead fw-bold'>Pon en práctica tus conocimientos<span className='text-primary'>.</span></p> <p>Puedes practicar por medio de preguntas de selección múltiple.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='d-flex pb-0 h-100'>
                <div className='container align-self-center bg-light'>
                    <div className='row mb-3'>
                        <div className='col-sm-6 col-lg-3 my-4'>
                            <h5 className='fw-bold mb-3'>Documentación</h5>
                            <ul className='list-unstyled'>
                                <li className='mb-3'><a href='https://github.com/JonnathanE/microlearning-LSEC' className='text-dark text-decoration-none' target='_blank' rel="noreferrer">Código Frontend</a></li>
                                <li><a href='https://github.com/JonnathanE/api-microlearning-LSEC' className='text-dark text-decoration-none' target='_blank' rel="noreferrer">Código Backend</a></li>
                            </ul>
                        </div>
                        <div className='col-sm-6 col-lg-3 my-4'>
                            <h5 className='fw-bold mb-3'>Institución</h5>
                            <ul className='list-unstyled'>
                                <li className='mb-3'><a href='https://github.com/JonnathanE' className='text-dark text-decoration-none' target='_blank' rel="noreferrer">Git Desarrollador</a></li>
                                <li><a href='https://www.fenasec.ec/' className='text-dark text-decoration-none' target='_blank' rel="noreferrer">FENASEC</a></li>
                            </ul>
                        </div>
                        <div className='col-sm-6 col-lg-3 my-4'>
                            <h5 className='fw-bold mb-3'>Más</h5>
                            <ul className='list-unstyled'>
                                <li className='mb-3'><a href='https://www.consejodiscapacidades.gob.ec/diccionario-de-lengua-de-senas-ecuatoriano-gabriel-roman/' className='text-dark text-decoration-none' target='_blank' rel="noreferrer">Diccionario de Lengua de Señas Ecuatoriano “Gabriel Román”</a></li>
                                <li><Link to='' className='text-dark text-decoration-none'>Créditos</Link></li>
                            </ul>
                        </div>
                        <div className='col-sm-6 col-lg-3 my-4'>
                            <h5 className='fw-bold mb-3'>Aprende LSEC</h5>
                            <ul className='list-unstyled'>
                                <li className='mb-3'>Tabajo de Titulación</li>
                                <li></li>
                            </ul>
                        </div>
                    </div>

                    <div className='border-top py-4'>
                        <div className='row'>
                            <div className='col-md-12 col-lg-6'>
                                <small>2021. Trabajo de Titulación. Todos los derechos reservados</small>
                            </div>
                            <div className='col-md-12 col-lg-6'>
                                <ul className='list-inline text-lg-end'>
                                    <li className='list-inline-item'><Link to='' className='text-dark text-decoration-none'><small>Términos y condiciones</small></Link></li>
                                    <li className='list-inline-item'><Link to='' className='text-dark text-decoration-none'><small>Aviso de privacidad</small></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage;