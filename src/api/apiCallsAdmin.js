import { publicRequest, userRequest } from './requestMethods';

// sigin admin
export const loginAdmin = async user => {
    const {data} = await publicRequest.post('/auth/signinadmin', user);
    return data
}

/**
 * METHODS FOR MANAGING MODULES
 */

// get all modules
export const getModules = async () => {
    const {data} = await publicRequest.get('/module');
    return data
}

// get module by id
export const getModuleById = async moduleId => {
    const {data} = await publicRequest.get(`/module/${moduleId}`);
    return data
}

// create a module
export const addModule = async module => {
    const {data} = await userRequest.post('/module', module);
    return data;
}

// update a module
export const updateModule = async (moduleId, module) => {
    const {data} = await userRequest.put(`/module/${moduleId}`, module);
    return data;
}

// delete a module
export const deleteModule = async moduleId => {
    const {data} = await userRequest.delete(`/module/${moduleId}`);
    return data;
}

/**
 * METHODS FOR MANAGING LESSONS
 */

// get all lessons
export const getLessons = async () => {
    const {data} = await publicRequest.get('/lesson');
    return data
}

// get lesson by id
export const getLessonById = async lessonId => {
    const {data} = await publicRequest.get(`/lesson/${lessonId}`);
    return data
}

// create a lesson
export const addLesson = async lesson => {
    const {data} = await userRequest.post('/lesson', lesson);
    return data;
}

// update a lesson
export const updateLesson = async (lessonId, lesson) => {
    const {data} = await userRequest.put(`/lesson/${lessonId}`, lesson);
    return data;
}

// update a lesson
export const updateLessonIcon = async (lessonId, icon) => {
    const {data} = await userRequest.put(`/lesson/icon/update/${lessonId}`, icon);
    return data;
}

// delete a lesson
export const deleteLesson = async lessonId => {
    const {data} = await userRequest.delete(`/lesson/${lessonId}`);
    return data;
}

/**
 * METHODS FOR MANAGING LESSONS
 */

// get all Microlearnings
export const getMicrolearnings = async () => {
    const {data} = await publicRequest.get('/micro');
    return data
}

// get Microlearning by id
export const getMicrolearningById = async microId => {
    const {data} = await publicRequest.get(`/micro/${microId}`);
    return data
}

// create a Microlearning
export const addMicrolearning = async micro => {
    const {data} = await userRequest.post('/micro', micro);
    return data;
}

// update a Microlearning
export const updateMicrolearning = async (microId, micro) => {
    const {data} = await userRequest.put(`/micro/${microId}`, micro);
    return data;
}

// update a image Microlearning
export const updateMicrolearningImage = async (microId, image) => {
    const {data} = await userRequest.put(`/micro/image/${microId}`, image);
    return data;
}

// update a Microlearning
export const updateMicrolearningGif = async (microId, gif) => {
    const {data} = await userRequest.put(`/micro/gif/${microId}`, gif);
    return data;
}

// delete a Microlearning
export const deleteMicrolearning = async microId => {
    const {data} = await userRequest.delete(`/micro/${microId}`);
    return data;
}

/**
 * METHODS FOR MANAGING CARDS
 */

// get all Cards
export const getCards = async () => {
    const {data} = await publicRequest.get('/card');
    return data
}

// get Card by id
export const getCardById = async cardId => {
    const {data} = await publicRequest.get(`/card/${cardId}`);
    return data
}

// create a Card
export const addCard = async card => {
    const {data} = await userRequest.post('/card', card);
    return data;
}

// update a Card
export const updateCard = async (cardId, card) => {
    const {data} = await userRequest.put(`/card/${cardId}`, card);
    return data;
}

// update a GIF Card
export const updateCardGif = async (cardId, gif) => {
    const {data} = await userRequest.put(`/card/gif/${cardId}`, gif);
    return data;
}

// delete a Card
export const deleteCard = async cardId => {
    const {data} = await userRequest.delete(`/card/${cardId}`);
    return data;
}

/**
 * METHODS FOR MANAGING CARDS
 */

// get all Users
export const getUsers = async () => {
    const {data} = await userRequest.get('/user');
    return data
}