import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getLessonsHome } from '../../api/apiCallsUser';
import { API } from '../../config';
import tw, { styled } from 'twin.macro';

const LessonWrapper = styled.div`
    ${tw`
            w-28 h-32 flex flex-col items-center justify-center
        `
    }
`;

const ImageWrapper = styled.div`
    ${tw`
            w-[72px] h-[72px] flex items-center justify-center rounded-full overflow-hidden object-cover
        `
    }
    ${({ complete }) => complete ? tw`bg-green-600` : tw`bg-gray-400`}
`;

const Section = ({ moduleId, completeLesson }) => {

    const [lessons, setLessons] = useState(null);

    const history = useHistory();
    const location = useLocation();
    const previusObjectUrl = location.state?.from;

    const loadLessons = async () => {
        try {
            const res = await getLessonsHome(moduleId);
            setLessons(res);
        } catch (error) {
            console.log(error);
        }
    }

    const clicKLesson = (lessonId) => {
        history.push(previusObjectUrl || `learn/${lessonId}`)
    }

    const clicKPractice = (lessonId) => {
        history.push(previusObjectUrl || `learn/practice/${lessonId}`)
    }

    useEffect(() => {
        loadLessons();
    }, [])

    return (
        <div className='flex flex-row flex-wrap justify-around'>
            {lessons &&
                lessons.map(lesson => (
                    <div key={lesson._id} className='w-32 mb-10 flex flex-col items-center gap-1'>
                        <LessonWrapper
                            onClick={(e) => clicKLesson(lesson._id, e)}
                        >
                            <ImageWrapper complete={completeLesson.find(e => e === lesson._id)}>
                                <img
                                    src={`${API}/lesson/icon/${lesson._id}`}
                                    alt={lesson.name}
                                    className="w-[55px] h-[55px] object-cover"
                                />
                            </ImageWrapper>
                            <p className='break-words font-bold text-center dark:text-white'>{lesson.name}</p>
                        </LessonWrapper>
                        <button
                            className='px-2 py-1 rounded-2xl text-white font-bold bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400'
                            onClick={(e) => clicKLesson(lesson._id, e)}
                            data-testid='btn-user-learn'>
                            Aprender
                        </button>
                        <button
                            className={completeLesson.find(element => element === lesson._id)
                                ? `px-2 py-1 rounded-2xl text-white font-bold bg-green-600 hover:bg-green-500`
                                : `px-2 py-1 rounded-2xl text-white font-bold bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400`}
                            onClick={(e) => clicKPractice(lesson._id, e)}
                            data-testid='btn-user-practice'>
                            Practicar
                        </button>
                    </div>
                ))
            }
        </div>

    );
}

export default Section;