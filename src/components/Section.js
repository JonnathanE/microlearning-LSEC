import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { lessonByModule, completeLearn } from '../core/apiCore';
import { API } from '../config';

import { NavLink, useParams, useHistory, useLocation } from 'react-router-dom';

import useAuth from '../auth/useAuth';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ShowImage from './ShowImage';

import './ShowImage.css';
import './Section.css'

const Section = ({ module }) => {

    const [lessons, setLessons] = useState([]);
    const [completeLesson, setCopleteLesson] = useState([]);

    const auth = useAuth();

    const history = useHistory();
    const location = useLocation();
    const previusObjectUrl = location.state?.from;

    const loadLessons = () => {
        lessonByModule(module._id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLessons(data);
                loadCompleteLearn();
            }
        });
    }

    const loadCompleteLearn = () => {
        completeLearn(auth.user.user._id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCopleteLesson(data.lesson);
            }
        });
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

                {lessons.map((lesson, i) => (

                    <div key={i} className='col-6 col-md-2 m-md-5 text-center mb-4'>

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
                        </div>
                        
                        <p className='title-lesson fw-bold mt-3' onClick={(e) => clicKLesson(lesson._id, e)}>{lesson.name}</p>

                        <button className={completeLesson.find(element => element === lesson._id) 
                            ? `rounded-pill p-2 mb-3 mb-lg-1 my-contend-complete text-white` 
                            : `rounded-pill p-2 mb-3 mb-lg-1 mt-1 bg-info text-dark`} 
                            onClick={(e) => clicKPractice(lesson._id, e)}>Practicar</button>

                        {/*
                            completeLesson.find(element => element === lesson._id) &&
                            <p className='text-success'>Completado</p>
                        */}
                    </div>

                ))}

            </div>

        </div>
    );
}

export default Section;