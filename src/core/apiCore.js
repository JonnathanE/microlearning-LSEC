import { API } from '../config';
import axios from 'axios';

export const signup = async (user) => {
    return fetch(`${API}/auth/signup`, {
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

export const isStudent = (roles) => {
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'student') {
                return true;
            }
        }
    }
    return false;
}

export const learnContent = async (lessonId) => {
    return fetch(`${API}/home/learn/${lessonId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}

export const learnCard = async (lessonId) => {
    return fetch(`${API}/home/card/${lessonId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}

export const completeLearn = async (userId) => {
    return fetch(`${API}/home/complete/learn/${userId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}

export const addCompleteLearn = async (lessonId, userId) => {
    const user = {
        user: userId
    }
    return fetch(`${API}/home/complete/lesson/${lessonId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}


// ? ELIMINAR ESTE METODO, YA NO SE UTILIZA
export const getLessons = async () => {
    return fetch(`${API}/lesson/`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}
