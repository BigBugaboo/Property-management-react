import axios from 'axios';

const api = {
    add: 'http://120.76.56.164:8080/register',
    list: '',
    edit: '',
    delete: 'http://120.76.56.164:8080/administrator/account',
    search: ''
};

export const _add = (data) => {
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    return axios.post(api.add, data)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

export const _delete = (data) => {
    return axios.post(api.add, data)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};
