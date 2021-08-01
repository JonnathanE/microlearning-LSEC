import { API } from '../config';
import axios from 'axios';

export const signin = async (user) => {
    return fetch(`${API}/auth/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

// save the token and the data in the localStorage
export const authenticateAdmin = (data) => {
    try {
        if (typeof window !== 'undefined') {
            if (data.user.roles) {
                if (isAdmin(data.user.roles)) {
                    localStorage.setItem('jwt', JSON.stringify(data));
                    return true;
                }
                return false;
            } else {
                return false;
            }
        }
        return false;
    } catch (error) {
        localStorage.removeItem('jwt');
        console.error(error);
    }
}

export const isAdmin = (roles) => {
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                return true;
            }
        }
    }
    return false;
}

// create a module
export const createteModule = (token, module) => {
    return fetch(`${API}/module/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(module)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const getModules = async () => {
    try {
        const response = await axios.get(`${API}/module`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const readModule = async (moduleId) => {
    return fetch(`${API}/module/${moduleId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}

// update a module
export const updateModule = (moduleId, token, module) => {
    return fetch(`${API}/module/${moduleId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(module)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

// delete a module
export const deleteModule = (moduleId, token) => {
    return fetch(`${API}/module/${moduleId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

// create a lesson
export const createteLesson = (token, lesson) => {
    return fetch(`${API}/lesson/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`
        },
        body: lesson
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

// get all lessons
export const getLessons = async () => {
    return fetch(`${API}/lesson/`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}

// get single lesson
export const readLesson = async (lessonId) => {
    return fetch(`${API}/lesson/${lessonId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}

// delete a lesson
export const deleteLesson = (lessonId, token) => {
    return fetch(`${API}/lesson/${lessonId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

// update lesson icon
export const updateLessonIcon = (token, lessonId, icon) => {
    return fetch(`${API}/lesson/icon/update/${lessonId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`
        },
        body: icon
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

// update a lesson
export const updateLesson = (token, lessonId ,lesson) => {
    return fetch(`${API}/lesson/${lessonId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(lesson)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

// create a microlearning
export const createteMicrolearning = (token, micro) => {
    return fetch(`${API}/micro/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`
        },
        body: micro
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

// get all Microlearning
export const getMicrolearnings = async () => {
    return fetch(`${API}/micro/`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}

// get single microlearning
export const readMicrolearning = async (lessonId) => {
    return fetch(`${API}/micro/${lessonId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}