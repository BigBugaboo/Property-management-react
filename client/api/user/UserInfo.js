import axios from 'axios';

const api = {
    list: 'http://120.76.56.164:8080/proprietor',
    search: '',
    passwordedit: 'http://120.76.56.164:8080/proprietor/password',
    edit: 'http://120.76.56.164:8080/proprietor'
};

const addCeptor = () => {
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        const store = window.sessionStorage.getItem('Token');
        if (store) {
            config.headers.common['token'] = store;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
};

export const _list = () => {
    addCeptor();

    return axios.get(api.list)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

export const _passwordedit = (data) => {
    addCeptor();

    return axios.put(api.passwordedit, data)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

export const _edit = (data) => {
    addCeptor();

    return axios.put(api.edit, data)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};
