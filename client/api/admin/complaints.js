import axios from 'axios';

const api = {
    list: 'http://120.76.56.164:8080/administrator/complaint/list',
    edit: 'http://120.76.56.164:8080/administrator/complaint/status',
    search: 'http://120.76.56.164:8080/administrator/complaint/keyword'
};

const addCeptor = () => {
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        const store = window.sessionStorage.getItem('Token');
        config.headers.common['Content-TypeContent-Type'] = 'application/json;charset=UTF-8';
        if (store) {
            config.headers.common['token'] = store;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
};

export const _add = (data) => {
    addCeptor();

    return axios.post(api.add, data)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

export const _edit = (data) => {
    addCeptor();
    console.log(data);
    return axios.put(api.edit, {
        id: data.id
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

export const _search = (data) => {
    addCeptor();
    return axios.get(api.search, {
        params: data
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
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

export const _delete = (data) => {
    addCeptor();

    return axios.delete(api.delete + '/' + data.id)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};
