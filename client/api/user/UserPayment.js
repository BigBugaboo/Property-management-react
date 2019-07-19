import axios from 'axios';

const api = {
    list: 'http://120.76.56.164:8080/proprietor/cost',
    search: 'http://120.76.56.164:8080/proprietor/cost/date',
    pay: 'http://120.76.56.164:8080/aliPay/preCreate',
    queryPay: 'http://120.76.56.164:8080/aliPay/query'
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

export const _pay = (data) => {
    addCeptor();

    return axios.post(api.pay + '/' + data.id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const _search = (data) => {
    addCeptor();

    return axios.get(api.search, {
        params: {
            date: data.date
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const _queryPay = (data) => {
    addCeptor();

    return axios.get(api.queryPay + '/' + data.id, {
        params: {
            serialNumber: data.serialNumber
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};
