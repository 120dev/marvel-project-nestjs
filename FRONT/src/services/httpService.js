import axios from 'axios';

const http = axios.create({
    baseURL: 'http://127.0.0.1:3333/',
});

http.interceptors.response.use(
    response => response,
    error => {
        console.dir(error)
        return Promise.reject(error);
    }
);

export default http;
