import axios from 'axios';
axios.defaults.baseURL = 'https://jobs-api-node-01.herokuapp.com/api/v1';
// axios.defaults.baseURL = 'localhost:5000/api/v1';

axios.interceptors.request.use(function (req) {
    const user = localStorage.getItem('user');

    if (user) {
        const { token } = JSON.parse(localStorage.getItem('user'));
        req.headers.authorization = `Bearer ${token}`;
        return req;
    }
    return req;
});