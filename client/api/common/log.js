import axios from 'axios';

const api = {
    login: '',
    logout: ''
};

export const login = (data) => {
    let result = axios.post(api.login, data);
    return { result: true };
};

export const logout = (data) => {
    let result = axios.post(api.logout, data);
    return { result: true };
};
