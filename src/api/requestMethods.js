import axios from 'axios';
import { API } from '../config';

const user = JSON.parse(localStorage.getItem("user"));
const TOKEN = user && user.token;

export const publicRequest = axios.create({
    baseURL: API
});

export const userRequest = axios.create({
    baseURL: API,
    headers: {Authorization: `Bearer ${TOKEN}`}
});