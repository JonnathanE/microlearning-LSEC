import React, { useState, useEffect } from 'react';
import { NavLink, useParams, Redirect } from 'react-router-dom';

import { learnCard } from '../../core/apiCore';
import { Progress } from 'reactstrap';

import { FaAngleRight, FaAngleLeft, FaGraduationCap } from "react-icons/fa";
import ShowImage from '../ShowImage';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './Practice.css';

const Practice = () => {
    const [cards, setCards] = useState([]);
    const [content, setContent] = useState({});
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [error, setError] = useState(false);
    const [aleatorio, setAleatorio] = useState(0);
    const [valorActual, setValorActual] = useState('');

    const { lessonId } = useParams();

    const MySwal = withReactContent(Swal);

    const loadContents = lessonId => {
        learnCard(lessonId).then(data => {
            if (data.error) {
                setError('No se ha registrado contenido para esta lección. Vuelve a recargar la página o regresa a la página principal para seguir con las lecciones: ')
            } else {
                setCards(data);
                setContent(data[0]);
                setTotal(data.length);
            }
        })
    }

    const nextContent = () => {

        if (valorActual === '') {
            MySwal.fire('Seleccione una respuesta');
        }

        if (valorActual === content.correctAnswer) {
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Respuesta Correcta',
                showConfirmButton: false,
                timer: 1500
            })
            let iter = count + 1;
            if (iter >= cards.length) iter = cards.length - 1;
            setContent(cards[iter]);
            setCount(iter);
            numRandom();
        }

        if (valorActual !== content.correctAnswer) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No es la respuesta correcta. Intente de nuevo.',
            })
        }

        if (count === total - 1) {
            MySwal.fire({
                title: 'Respuesta Correcta',
                text: "Felicidades, ha terminado toda la práctica para esta lección.",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Seguir'
            }).then((result) => {
                if (result.isConfirmed) {
                    setRedirectToReferrer(true);
                }
            })
        }
    }

    const backContent = () => {
        let iter = count - 1;
        if (iter < 0) iter = 0;
        setContent(cards[iter]);
        setCount(iter);
        setValorActual('');
        numRandom();
    }

    const redirectLearn = () => {
        setRedirectToReferrer(true)
    }

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/learn" />
        }
    }

    const onChangeValue = (event) => {
        setValorActual(event.target.value)
    }

    const numRandom = () => {
        const max = 2;
        const min = 0;
        setAleatorio(Math.floor(Math.random() * (max - min)) + min);
    }

    useEffect(() => {
        loadContents(lessonId);
        numRandom();
    }, [])

    const progress = () => (
        <>
            <div className='row mt-4 justify-content-center'>
                <div className="col-6">
                    <p className='text-center fw-bold mt-2'>{count + 1} de {total}</p>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-1 me-4 bounce-top ps-4'>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => redirectLearn()}></button>
                </div>
                <div className='col-8 col-md-10 pt-1'>
                    <Progress value={count + 1} max={total} />
                </div>
            </div>
        </>
    )

    const capsule = () => (
        <>
            <div className='row justify-content-center'>
                <div className='col-12 text-focus-in'>
                    <h2>
                        {content.question}
                    </h2>
                </div>
            </div>

            <div className='row d-flex'>
                <div className='content col-12 col-lg-6 mx-auto align-self-center'>
                    <ShowImage styles='gif img-fluid' item={content} url='card/gif' />
                </div>
            </div>

            <div className='row justify-content-center mt-3 answer-content'>
                {aleatorio === 0 &&
                    <div className='col-4 col-md-1' onChange={onChangeValue}>
                        <div className='form-check form-check-inline'>
                            <input type="radio" className='form-check-input' id="inlineRadio1" value={content.correctAnswer} name="gender" />
                            <label class="form-check-label h3" for="inlineRadio1">{content.correctAnswer}</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input type="radio" className='form-check-input' id="inlineRadio2" value={content.wrongAnswer} name="gender" />
                            <label class="form-check-label h3" for="inlineRadio2">{content.wrongAnswer}</label>
                        </div>
                    </div>
                }

                {aleatorio === 1 &&
                    <div className='col-4 col-md-1' onChange={onChangeValue}>
                        <div className='form-check form-check-inline'>
                            <input type="radio" className='form-check-input' id="inlineRadio2" value={content.wrongAnswer} name="gender" />
                            <label class="form-check-label h3" for="inlineRadio2">{content.wrongAnswer}</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input type="radio" className='form-check-input' id="inlineRadio1" value={content.correctAnswer} name="gender" />
                            <label class="form-check-label h3" for="inlineRadio1">{content.correctAnswer}</label>
                        </div>
                    </div>
                }
            </div>

            <div className='row justify-content-center align-items-center mt-2'>
                <div className='col-6 text-center mb-4'>

                    {count > 0 && <button className='btn btn-danger rounded-pill' onClick={() => backContent()}><FaAngleLeft /> Atrás</button>}

                    {count === 0 && <NavLink to='/learn' className='btn btn-danger rounded-pill'><FaGraduationCap /> Lecciones</NavLink>}
                </div>
                <div className='col-6 text-center mb-4'>
                    <button className='btn btn-success rounded-pill' onClick={() => nextContent()}>Comprobar <FaAngleRight /></button>
                </div>
            </div>
        </>
    )

    // show backend error alert
    const showError = () => (
        <div className='alert alert-danger align-middle mt-5' role="alert" style={{ display: error ? '' : 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            {error}
            <NavLink to='/learn' className='btn btn-info rounded-pill'><FaGraduationCap /> Lecciones</NavLink>
        </div>
    )

    return (
        <>
            <div className='container shadow-drop-center'>
                {showError()}
                {Object.keys(content).length > 0 && progress()}
                {Object.keys(content).length > 0 && capsule()}
                {redirectUser()}
            </div>
        </>
    )
}

export default Practice;