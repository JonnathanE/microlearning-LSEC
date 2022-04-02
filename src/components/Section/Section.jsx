import { useState, useEffect } from 'react';

import { getLessonsHome, getCompleteLearn } from '../../api/apiCallsUser';
import { API } from '../../config';

import { useHistory, useLocation } from 'react-router-dom';

import './section.css'

const Section = ({ moduleId }) => {

    const [lessons, setLessons] = useState(null);
    const [completeLesson, setCopleteLesson] = useState([]);

    const history = useHistory();
    const location = useLocation();
    const previusObjectUrl = location.state?.from;

    const loadLessons = async () => {
        try {
            const res = await getLessonsHome(moduleId);
            setLessons(res);
            loadCompleteLearn();
        } catch (error) {
            console.log(error);
        }
    }

    const loadCompleteLearn = async () => {
        try {
            const res = await getCompleteLearn();
            setCopleteLesson(res.lesson);
        } catch (error) {
            console.log(error)
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
        <div className="card my-card shadow p-3 mb-4 bg-body rounded">
            <div className='row justify-content-center align-items-center'>

                {lessons &&
                    lessons.map(lesson => (
                        <div key={lesson._id} className='col-6 col-md-2 m-md-5 text-center mb-4'>
                            <div
                                className={
                                    completeLesson.find(element => element === lesson._id)
                                        ? 'my-contend-complete'
                                        : 'my-contend'}
                                onClick={(e) => clicKLesson(lesson._id, e)}
                            >
                                <img
                                    src={`${API}/lesson/icon/${lesson._id}`}
                                    alt={lesson.name}
                                    className="my-icon mx-auto d-block"
                                />
                                <p className='title-lesson fw-bold mt-3'>{lesson.name}</p>
                            </div>
                            <button className='rounded-pill p-2 mb-3 mb-lg-1 mt-1 bg-info text-dark'
                                onClick={(e) => clicKLesson(lesson._id, e)}>Aprender</button>
                            <button className={completeLesson.find(element => element === lesson._id)
                                ? `rounded-pill p-2 mb-3 mb-lg-1 my-contend-complete text-white`
                                : `rounded-pill p-2 mb-3 mb-lg-1 mt-1 bg-info text-dark`}
                                onClick={(e) => clicKPractice(lesson._id, e)}>Practicar</button>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default Section;