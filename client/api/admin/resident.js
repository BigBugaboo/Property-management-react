import axios from 'axios';

const api = {
    list: '',
    add: '',
    edit: '',
    search: '',
};

export const list = data => {
    let result = axios.get(api.list, data);
    return { result: true };
};

export const add = data => {
    let result = axios.post(api.add, data);
    return { result: true };
};

export const edit = data => {
    let result = axios.put(api.edit, data);
    return { result: true };
};

export const search = data => {
    let result = axios.post(api.search, data);
    return { result: true };
};
