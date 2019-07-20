import axios from 'axios';

const api = {
    list: 'http://120.76.56.164:8080/proprietor/repairs',
    add: 'http://120.76.56.164:8080/proprietor/repairs',
    search: 'http://120.76.56.164:8080/proprietor/repairs/keyword',
    edit: 'http://120.76.56.164:8080/proprietor/repairs',
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

export const _add = (data) => {
    addCeptor();

    return axios.post(api.add, data)
        .then((Response) => {
            return Response.data;
        }).catch((error) => {
            console.log(error);
        });
};
export const _search = (data) => {
    addCeptor();

    return axios.get(api.search, {
        params: {
            keyword: data.summary
        }
    })
        .then((Response) => {
            return Response.data;
        }).catch((error) => {
            console.log(error);
        });
};
export const _edit = (data) => {
    addCeptor();

    return axios.put(api.edit, data)
        .then((Response) => {
            return Response.data;
        }).catch((error) => {
            console.log(error);
        });
};
