import axios from 'axios';

const api = {
    login: 'http://120.76.56.164:8080/login',
    logout: ''
};

export const login = (data) => {
    return axios.post(api.login, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const logout = (data) => {
    let result = axios.post(api.logout, data);
    return { result: true };
};
