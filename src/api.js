import axios from 'axios';
import { alertError, alertSuccess } from './helpers';

const API = axios.create({baseURL: '/', timeout: 60 * 1000});

API.interceptors.response.use(
    (response) => {
        if (response.data['msg']) alertSuccess(response.data['msg']);
        return Promise.resolve(response)
    },
    (error) => {
        if (error.response.data['msg']) alertError(error.response.data['msg']);
        return Promise.reject(error)
    }
);

export default class APIHelper {

    static get = (path) => {
        return new Promise((resolve, reject) => {
            API.get(path)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data))
        });
    };

    static post = (path, data) => {
        return new Promise((resolve, reject) => {
            API.post(path, {...data})
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data))
        });
    };
}