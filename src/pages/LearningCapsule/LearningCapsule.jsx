import { useState, useEffect } from 'react';
import { NavLink, useParams, Redirect } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getLearnContent, addCompleteLearn } from '../../api/apiCallsUser';
import useAuth from '../../auth/useAuth';
import Alert from '../../components/Alert/Alert';
import Backdrops from '../../components/Backdrops/BackdropTW';
import { FaAngleRight, FaAngleLeft, FaGraduationCap } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import ShowImage from '../../components/ShowImage/ShowImage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

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
        <div className='flex flex-col'>
            {data?.totalDocs > 0 &&
                <>
                    <p className='text-center'>{page} de {data?.totalDocs}</p>
                    <div className='flex items-center'>
                        <button type="button" className="w-5 h-5 mr-2 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" aria-label="Close" onClick={() => redirectLearn()}>
                            <AiOutlineClose />
                        </button>
                        <div className='w-full'>
                            {/* <Progress value={page} max={data?.totalDocs} /> */}
                            <BorderLinearProgress variant="determinate" value={(page * 100) / data?.totalDocs} />
                        </div>
                    </div>
                </>
            }
        </div>
    )

    const capsule = () => (
        <div className='flex flex-col gap-2 sm:gap-5'>
            {data?.totalDocs > 0 &&
                <>
                    <h2 className='text-center font-bold text-3xl'>
                        {data?.docs[0].title}
                    </h2>
                    <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-2'>
                        <ShowImage styles='w-32 h-32 sm:w-72 sm:h-72 rounded-lg' name={data?.docs[0].title} url={data?.docs[0].image_url?.url} />
                        <ShowImage styles='w-72 h-72 sm:w-96 sm:h-96' name={data?.docs[0].title} url={data?.docs[0].gif_url?.url} />
                    </div>
                </>
            }
        </div>
    )

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

    const showMessageNoContent = () => (
        <Alert severity='info'>
            <div className='flex flex-col gap-2'>
                <span>
                    Lo sentimos, todavía no hay contenido para esta lección.
                </span>
                <NavLink to='/learn' className='flex justify-center items-center gap-2 w-full sm:w-48 h-11 px-8 font-medium border border-blue-700 rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300'><FaGraduationCap /> Ir a Lecciones</NavLink>
            </div>
        </Alert>

    )

    return (
        <>
            {isFetching && <Backdrops />}
            {isPreviousData && <Backdrops />}
            {redirectUser()}

            <div className='w-full h-screen font-sans text-gray-900 dark:bg-gray-800 dark:text-white'>

                <div className='flex flex-col sm:gap-8 py-3 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24'>
                    {error && showError()}
                    {data?.totalDocs === 0 && showMessageNoContent()}
                    {!error && progress()}
                    {capsule()}
                </div>

                <div className='fixed bottom-0 w-full max-w-screen-xl h-28 border-t-2 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 px-6 mx-auto sm:px-8 md:px-12 lg:px-16 xl:px-24'>
                    <div className='w-full h-full relative flex flex-col sm:flex-row gap-2 items-center justify-between'>

                        {data?.hasPrevPage &&
                            <button className='flex justify-center items-center gap-2 w-full sm:w-44 h-13 px-8 bg-bookmark-cyan-500 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300' onClick={() => backContent()}>
                                <FaAngleLeft /> Atrás
                            </button>}

                        {!data?.hasPrevPage &&
                            <NavLink to='/learn' className='flex justify-center items-center gap-2 w-full sm:w-56 h-13 px-8 bg-red-700 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-xl transition-shadow duration-300'>
                                <FaGraduationCap /> Ir a Lecciones
                            </NavLink>}

                        {data?.hasNextPage &&
                            <button className='flex justify-center items-center gap-2 w-full sm:w-44 h-13 px-8 bg-bookmark-cyan-500 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300' onClick={() => nextContent()}>
                                Siguiente <FaAngleRight />
                            </button>}
                        {data?.totalDocs !== 0 &&
                            <>
                                {!data?.hasNextPage &&
                                    <button onClick={() => redirectLearnFinal()} className='flex justify-center items-center gap-2 w-full sm:w-56 h-13 px-8 bg-green-600 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300'>
                                        <FaGraduationCap /> Terminar lección
                                    </button>}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default LearningCapsule;