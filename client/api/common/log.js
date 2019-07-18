import axios from 'axios';

const api = {
    login: 'http://60.205.184.135/mock/78/login',
    logout: ''
};

export const login = (data) => {
    axios.post(api.login, data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    return { result: true };
};

const data = {
    username: 'liujincheng',
    password: '123'
};
login(data);

export const logout = (data) => {
    let result = axios.post(api.logout, data);
    return { result: true };
};
