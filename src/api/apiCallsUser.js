import { publicRequest, userRequest } from './requestMethods';

// sigin user
export const loginUser = async user => {
    const {data} = await publicRequest.post('/auth/signin', user);
    return data
}

// list modules in user home
export const getModulesHome = async () => {
    const {data} = await publicRequest.get('/home/modules');
    return data
}

// list lessons in user home
export const getLessonsHome = async moduleId => {
    const {data} = await publicRequest.get(`/home/lessons/${moduleId}`);
    return data
}

// list lessons in user home
export const getCompleteLearn = async () => {
    const {data} = await userRequest.get(`/home/complete/learn`);
    return data
}

// get learn Content
export const getLearnContent = async lessonId => {
    const {data} = await publicRequest.get(`/home/learn/${lessonId}`);
    return data;
}

// add complete learn
export const addCompleteLearn = async lessonId => {
    const {data} = await userRequest.put(`/home/complete/lesson/${lessonId}`);
    return data;
}