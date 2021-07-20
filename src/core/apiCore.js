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

// create a category
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