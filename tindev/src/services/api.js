import axios from 'axios';

const api = axios.create({
    // meu IP
    // baseURL: 'http://192.168.0.110:3333'
    baseURL: 'http://192.168.1.56:3333'
});

export default api;