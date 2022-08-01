import axios from 'axios';
import { API } from '../config';
import { publicRequest } from './requestMethods';

// sigin user
export const loginUser = async user => {
    const { data } = await publicRequest.post('/auth/signin', user);
    return data
}

// signup user
export const signupUser = async user => {
    const { data } = await publicRequest.post('/auth/signup', user);
    return data
}

// list modules in user home
export const getModulesHome = async () => {
    const { data } = await publicRequest.get('/home/modules');
    return data
}

// list lessons in user home
export const getLessonsHome = async moduleId => {
    const { data } = await publicRequest.get(`/home/lessons/${moduleId}`);
    return data
}

// list lessons in user home
export const getCompleteLearn = async token => {
    const { data } = await axios({
        method: 'get',
        url: `${API}/home/complete/learn`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return data
}

// get learn Content
export const getLearnContent = async (lessonId, page) => {
    const { data } = await publicRequest.get(`/home/learn/${lessonId}?page=${page}`);
    return data;
}

// get learn Content
export const getAllLearnContent = async (lessonId) => {
    const { data } = await publicRequest.get(`/home/learn/${lessonId}`);
    return data;
}

// add complete learn
export const addCompleteLearn = async (lessonId, token) => {
    const { data } = await axios({
        method: 'put',
        url: `${API}/home/complete/lesson/${lessonId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
}

// get knoweled card
export const getCards = async (lessonId, page) => {
    const { data } = await publicRequest.get(`/home/card/${lessonId}?page=${page}`);
    return data;
}

// get knoweled card
export const getAllCards = async (lessonId) => {
    const { data } = await publicRequest.get(`/home/card/${lessonId}`);
    return data;
}