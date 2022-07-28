import { useState, Suspense, lazy } from 'react';
import { NavLink, useParams, Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllCards } from '../../api/apiCallsUser';
import tw, { styled as stylesTW } from 'twin.macro';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Backdrops from '../../components/Backdrops/BackdropTW';
import Alert from '../../components/Alert/Alert';
import { AiOutlineClose, AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";

const ShowImage = lazy(() => import('../../components/ShowImage/ShowImage'));

/**
 * * Hacer aleatorio las opciones
 */

const ButtonCheck = stylesTW.button`
    ${tw`
    flex justify-center items-center gap-3 w-full sm:w-44 h-13 px-8 bg-bookmark-cyan-500 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300 cursor-pointer
        `
    }
    ${({ active }) => active ? tw`` : tw`bg-gray-500 cursor-not-allowed`}
`;

const ContentBottom = stylesTW.div`
    ${tw`
            bottom-0 fixed w-screen flex flex-col sm:flex-row py-3 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24 border-t-2 dark:border-gray-700 bg-white dark:bg-gray-800
        `
    }
    ${({ severity }) => severity === 'bad' ? tw`text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800` : tw``}
    ${({ severity }) => severity === 'good' ? tw`text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800` : tw``}
`;

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

const Practice = () => {

    const { lessonId } = useParams();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [selected, setSelected] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [changeSlider, setChangeSlider] = useState(false);
    const [endAnswer, setEndAnswer] = useState('noSelect'); // good, bad, noSelect
    const [score, setScore] = useState(0);
    const [isFinish, setIsFinish] = useState(false);

    const { data, error, isFetching } = useQuery(
        ["practiceAll", lessonId],
        () => getAllCards(lessonId),
        { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
    );

    const redirectLearn = () => {
        setRedirectToReferrer(true);
    }

    const onChangeValue = (event) => {
        setSelected(event.target.value);
        setIsSelected(true);
    }

    const onChangeSlide = () => {
        if (currentSlide < data.length - 1) {
            setCurrentSlide(old => (old < data?.length - 1 ? old + 1 : old));
            setIsSelected(false);
            setChangeSlider(false);
            setEndAnswer('noSelect');
        } else if (currentSlide === data.length - 1) {
            setIsFinish(true);
        }
    }

    const nextContent = () => {
        if (selected === '') {
        } else if (selected === data[currentSlide].correctAnswer) {
            setSelected('');
            setEndAnswer('good')
            setScore(old => old + 1);
            setChangeSlider(true)
        } else if (selected === data[currentSlide].wrongAnswer) {
            setEndAnswer('bad')
            setChangeSlider(true)
        }
    }

    const progress = () => (
        <div className='flex flex-col'>
            {data?.length > 0 &&
                <>
                    <p className='text-center'>{currentSlide + 1} de {data?.length}</p>
                    <div className='flex items-center'>
                        <button type="button" className="w-5 h-5 mr-2 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" aria-label="Close" onClick={() => redirectLearn()}>
                            <AiOutlineClose />
                        </button>
                        <div className='w-full'>
                            {/* <Progress value={page} max={data?.totalDocs} /> */}
                            <BorderLinearProgress variant="determinate" value={((currentSlide + 1) * 100) / data?.length} />
                        </div>
                    </div>
                </>
            }
        </div>
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/learn" />
        }
    }

    const showFinish = () => (
        <>
            <div className='w-screen h-full py-3 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24 flex items-center justify-center'>
                <div className='flex flex-col gap-10'>
                    <h2 className='font-bold text-center text-3xl'>Obtuviste <span className='text-bookmark-cyan-500'>{score}</span> de <span className='text-bookmark-cyan-500'>{data.length}</span> respuestas correctas.</h2>
                    <span>Buen trabajo, sigue así</span>
                </div>
            </div>
            <ContentBottom>
                <div className='w-full h-full flex flex-col sm:flex-row gap-2 items-center justify-end'>
                    <NavLink className="flex justify-center items-center gap-3 w-full sm:w-44 h-13 px-8 bg-bookmark-cyan-500 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300 cursor-pointer" to='/learn'>
                        CONTINUAR
                    </NavLink>
                </div>
            </ContentBottom>
        </>
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
            <div className='w-[100vw] h-screen flex flex-col overflow-x-hidden font-sans text-gray-900 dark:bg-gray-800 dark:text-white'>

                {isFetching && <Backdrops />}
                {data?.length === 0 && showMessageNoContent()}
                {error && showError()}
                {redirectUser()}

                {isFinish
                    ? showFinish()
                    : <>
                        <div className='w-screen py-3 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24 '>
                            {progress()}
                        </div>
                        <div className='relative h-screen'>
                            <div id='slider' className='h-screen sm:h-[350px] flex absolute left-0 transition duration-1000 ease-out' style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>

                                {data?.length > 0 &&
                                    <>
                                        {data.map((d, i) => (
                                            <div key={i} className='w-[100vw] flex items-center justify-center'>
                                                <div id='item' className='w-[100vw] h-full flex flex-col items-center'>
                                                    <h2 className='text-center font-bold text-3xl'>
                                                        {d.question}
                                                    </h2>
                                                    <div className='w-full flex flex-col items-center justify-center sm:justify-around gap-2  sm:gap-8 py-3 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24'>
                                                        <Suspense fallback={<div>Loading...</div>}>
                                                            <ShowImage styles='w-60 h-60 sm:w-72 sm:h-72' name={d.title} url={d.gif_url?.url} alternative="Cargando Gif ..." />
                                                        </Suspense>
                                                        <div className='w w-full flex flex-col sm:flex-row items-center justify-around gap-1 flex-wrap'>

                                                            <label className='flex justify-center items-center gap-2 w-full sm:w-72 h-13 px-8 cursor-pointer bg-bookmark-cyan-500 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300'>
                                                                <input type="radio" name='answer' value={d.correctAnswer} onChange={onChangeValue} />
                                                                {d.correctAnswer}
                                                            </label>
                                                            <label className='flex justify-center items-center gap-2 w-full sm:w-72 h-13 px-8 cursor-pointer bg-bookmark-cyan-500 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300'>
                                                                <input type="radio" name='answer' value={d.wrongAnswer} onChange={onChangeValue} />
                                                                {d.wrongAnswer}
                                                            </label>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                }
                            </div>
                        </div>
                        <ContentBottom severity={endAnswer}>
                            {endAnswer === 'good' &&
                                <div className='w-full flex gap-5 items-center'>
                                    <AiFillCheckCircle className='h-13 w-13 text-green-700' />
                                    <span className='font-bold text-lg text-green-700'>¡Excelente!</span>
                                </div>
                            }
                            {endAnswer === 'bad' &&
                                <div className='w-full flex gap-5 items-center'>
                                    <AiFillCloseCircle className='h-13 w-13 text-red-700' />
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-lg text-red-700'>¡Ups! Respuesta Correcta:</span>
                                        <span className=' text-red-700'>{data[currentSlide].correctAnswer}</span>
                                    </div>
                                </div>
                            }
                            <div className='w-full h-full flex flex-col sm:flex-row gap-2 items-center justify-end'>
                                {changeSlider
                                    ? <ButtonCheck active={isSelected} disabled={!isSelected} onClick={() => onChangeSlide()}>
                                        CONTINUAR
                                    </ButtonCheck>
                                    : <ButtonCheck active={isSelected} disabled={!isSelected} onClick={() => nextContent()}>
                                        COMPROBAR
                                    </ButtonCheck>
                                }
                            </div>
                        </ContentBottom>
                    </>}
            </div>
        </>
    )
}


export default Practice;