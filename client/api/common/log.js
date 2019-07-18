import axios from 'axios';

const api = {
    login: 'http://120.76.56.164:8080/login',
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
