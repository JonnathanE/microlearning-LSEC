import React, { useState, useEffect } from 'react';
import { getLessons, completeLearn } from '../../core/apiCore';
import useAuth from '../../auth/useAuth';

import Navigation from '../../layout/Navigation';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";



const Progress = () => {

    const [lessons, setLessons] = useState([]);
    const [completeLesson, setCopleteLesson] = useState([]);

    const auth = useAuth();

    const loadLessons = () => {
        getLessons().then(data => {
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

    useEffect(() => {
        loadLessons();
    }, [])

    return (
        <>
            <Navigation />
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col"># de Módulo</th>
                                    <th scope="col">Lecciones</th>
                                    <th scope="col">Completado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessons.map((lesson, i) => (
                                    <tr key={i}>
                                        <th scope="row">{lesson.module ? lesson.module.number : 'No asignado'}</th>
                                        <td>{lesson.name}</td>
                                        {
                                            completeLesson.find(element => element === lesson._id)
                                                ? <td className='text-success'><FaCheckCircle /></td>
                                                : <td className='text-danger'><FaTimesCircle /></td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Progress;