import { useState, useEffect } from 'react';
import { NavLink, useParams, Redirect } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getLearnContent, addCompleteLearn } from '../../api/apiCallsUser';
import useAuth from '../../auth/useAuth';

import Backdrops from '../../components/Backdrops/Backdrops';
import { Progress } from 'reactstrap';
import { FaAngleRight, FaAngleLeft, FaGraduationCap } from "react-icons/fa";
import ShowImage from '../../components/ShowImage/ShowImage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './learningCapsule.css';

const LearningCapsule = () => {

    const { lessonId } = useParams();
    const queryClient = useQueryClient();
    const auth = useAuth();
    const MySwal = withReactContent(Swal);

    const [page, setPage] = useState(1);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);


    const { data, error, isFetching, isPreviousData } = useQuery(
        ["learn", lessonId, page],
        () => getLearnContent(lessonId, page),
        { keepPreviousData: true, staleTime: 5000 }
    );


    const nextContent = () => {
        setPage(old => (data?.hasNextPage ? old + 1 : old))
    }

    const backContent = () => {
        setPage(old => Math.max(old - 1, 1))
    }

    const redirectLearn = () => {
        setRedirectToReferrer(true)
    }

    const redirectLearnFinal = async () => {
        try {
            await addCompleteLearn(lessonId, auth.user.token);
            setRedirectToReferrer(true);
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

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/learn" />
        }
    }

    useEffect(() => {
        if (data?.hasNextPage) {
            queryClient.prefetchQuery(
                ["learn", lessonId, page + 1],
                () => getLearnContent(lessonId, page + 1)
            )
        }
    }, [data?.hasNextPage, lessonId, page, queryClient])

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
                    <div className='row justify-content-center'>
                        <div className='col-12'>
                            <h2>
                                {data?.docs[0].title}
                            </h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-6 d-flex'>
                            <div className='content mx-auto align-self-center'>
                                <ShowImage styles='my-image img-fluid' name={data?.docs[0].title} url={data?.docs[0].image_url?.url} />
                            </div>
                        </div>
                        <div className='col-12 col-lg-6 d-flex'>
                            <div className='content-gif mx-auto align-self-center'>
                                <ShowImage styles='img-fluid' name={data?.docs[0].title} url={data?.docs[0].gif_url?.url} />
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-center align-items-center mt-5'>
                        <div className='col-6 text-center mb-4'>
                            {data?.hasPrevPage && <button className='btn btn-danger rounded-pill' onClick={() => backContent()}><FaAngleLeft /> Atrás</button>}
                            {!data?.hasPrevPage && <NavLink to='/learn' className='btn btn-danger rounded-pill'><FaGraduationCap /> Lecciones</NavLink>}
                        </div>
                        <div className='col-6 text-center mb-4'>
                            {data?.hasNextPage && <button className='btn btn-success rounded-pill' onClick={() => nextContent()}>Siguiente <FaAngleRight /></button>}
                            {!data?.hasNextPage && <button onClick={() => redirectLearnFinal()} className='btn btn-danger rounded-pill'><FaGraduationCap /> Terminar lección</button>}
                        </div>
                    </div>
                </>
            }
        </>
    )

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

    const showMessageNoContent = () => (
        <div className='container'>
            <div class="alert alert-info align-middle mt-5" role="alert">
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
            <div className='container shadow-drop-center mb-4'>
                {progress()}
                {capsule()}
                {redirectUser()}
            </div>
        </>
    )
}

export default LearningCapsule;