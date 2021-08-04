import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { lessonByModule } from '../core/apiCore';
import { API } from '../config';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ShowImage from './ShowImage';

import './ShowImage.css';
import './Section.css'

const Section = ({ module }) => {

    const [lessons, setLessons] = useState([]);

    const loadLessons = () => {
        lessonByModule(module._id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLessons(data);
            }
        });
    }

    const clicKLesson = (lessonId) => {
        console.log(lessonId)
    }

    useEffect(() => {
        loadLessons();
    }, [])

    return (
        <div className="card my-card m-10 card-cont shadow">
            <div className='row justify-content-center align-items-center mt-5'>
                {lessons.map((lesson, i) => (
                    <div key={i} className='col-6 col-sm-4 text-center mb-5' onClick={(e) => clicKLesson(lesson._id, e)}>
                        <div className='my-contend'>
                            <img
                                src={`${API}/lesson/icon/${lesson._id}`}
                                alt={lesson.name}
                                className="icon-lesson mx-auto d-block"
                            />
                            <p className='title-lesson h4 mt-3'>{lesson.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;