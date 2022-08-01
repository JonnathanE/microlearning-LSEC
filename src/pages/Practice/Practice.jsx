import { useState, useEffect, useRef } from 'react';
import { NavLink, useParams, Redirect } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getCards } from '../../api/apiCallsUser';

import { Progress } from 'reactstrap';
import Backdrops from '../../components/Backdrops/Backdrops';
import { FaAngleRight, FaAngleLeft, FaGraduationCap } from "react-icons/fa";
import ShowImage from '../../components/ShowImage/ShowImage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './Practice.css';

const Practice = () => {

    const { lessonId } = useParams();
    const queryClient = useQueryClient();
    const MySwal = withReactContent(Swal);

    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState('');
    const radiosWrapper = useRef();

    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [aleatorio, setAleatorio] = useState(0);

    const { data, error, isFetching, isPreviousData } = useQuery(
        ["card", lessonId, page],
        () => getCards(lessonId, page),
        { keepPreviousData: true, staleTime: 5000 }
    );

    const answers = data ? [data.docs[0]?.correctAnswer, data.docs[0]?.wrongAnswer] : [];

    const onChangeValue = (event) => {
        setSelected(event.target.value)
    }

    const nextContent = () => {
        if (selected === '') {
            MySwal.fire('Seleccione una respuesta');
        }
        if (selected === data?.docs[0]?.correctAnswer) {
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Respuesta Correcta',
                showConfirmButton: false,
                timer: 1500
            })
            setSelected('')
            if (data?.hasNextPage === false) {
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
            setPage(old => (data?.hasNextPage ? old + 1 : old))
        }
        if (selected !== data?.docs[0]?.correctAnswer) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No es la respuesta correcta. Intente de nuevo.',
            })
        }
    }

    const backContent = () => {
        setSelected('')
        setPage(old => Math.max(old - 1, 1))
    }

    const redirectLearn = () => {
        setRedirectToReferrer(true)
    }

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/learn" />
        }
    }

    const numRandom = () => {
        const max = 2;
        const min = 0;
        setAleatorio(Math.floor(Math.random() * (max - min)) + min);
    }

    useEffect(() => {
        if (data?.hasNextPage) {
            queryClient.prefetchQuery(
                ["card", lessonId, page + 1],
                () => getCards(lessonId, page + 1)
            )
        }
        if (data?.totalDocs > 0) {
            const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
            if (findCheckedInput) {
                findCheckedInput.checked = false;
            }
        }
        numRandom();
    }, [data, data?.hasNextPage, lessonId, page, queryClient])

    const progress = () => (
        <>
            {data?.totalDocs > 0 &&
                <>
                    <div className='row mt-4 justify-content-center'>
                        <div className="col-6">
                            <p className='text-center fw-bold mt-2'>{page} de {data?.totalDocs}</p>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-1 me-4 bounce-top ps-4'>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => redirectLearn()}></button>
                        </div>
                        <div className='col-8 col-md-10 pt-1'>
                            <Progress value={page} max={data?.totalDocs} />
                        </div>
                    </div>
                </>
            }
        </>
    )

    const capsule = () => (
        <>
            {data?.totalDocs > 0 &&
                <>
                    <div className='row justify-content-center text-cemter'>
                        <h2>
                            {data?.docs[0].question}
                        </h2>
                    </div>
                    <div className='row d-flex'>
                        <div className='content col-12 col-lg-6 mx-auto align-self-center'>
                            <ShowImage styles='gif img-fluid' name={data?.docs[0].question} url={data?.docs[0].gif_url?.url} />
                        </div>
                    </div>
                    <div className='row justify-content-center mt-5 mb-5'>
                        {aleatorio === 0 && <>
                        </>}
                        <div>
                            <div className='answer-wrapper' ref={radiosWrapper}>
                                {answers.map((answer, i) => (
                                    <label key={i}>
                                        <input type="radio" name='answer' value={answer} onChange={onChangeValue} />
                                        {answer}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center align-items-center mt-2'>
                        <div className='col-6 text-center mb-4'>
                            {data?.hasPrevPage && <button className='btn btn-danger rounded-pill' onClick={() => backContent()}><FaAngleLeft /> Atrás</button>}
                            {!data?.hasPrevPage && <NavLink to='/learn' className='btn btn-danger rounded-pill'><FaGraduationCap /> Lecciones</NavLink>}
                        </div>
                        <div className='col-6 text-center mb-4'>
                            <button className='btn btn-success rounded-pill' onClick={() => nextContent()}>Comprobar <FaAngleRight /></button>
                        </div>
                    </div>
                </>
            }
        </>
    )

    // show backend error alert
    const showError = () => (
        <div className='container'>
            <div className="alert alert-danger align-middle mt-5" role="alert">
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

    const showMessageNoContent = () => (
        <div className='container'>
            <div className="alert alert-info align-middle mt-5" role="alert">
                <div className='row'>
                    <span>
                        Lo sentimos, todavía no hay contenido para esta lección.
                    </span>
                </div>
                <NavLink to='/learn' className='btn btn-info rounded-pill'><FaGraduationCap /> Ir a Lecciones</NavLink>
            </div>
        </div>
    )

    return (
        <>
            {isFetching && <Backdrops />}
            {isPreviousData && <Backdrops />}
            {data?.totalDocs === 0 && showMessageNoContent()}
            {error && showError()}
            <div className='container shadow-drop-center'>
                {progress()}
                {capsule()}
                {redirectUser()}
            </div>
        </>
    )
}

export default Practice;