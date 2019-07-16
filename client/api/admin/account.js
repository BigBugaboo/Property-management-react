import axios from 'axios';

const api = {
    add: '',
    list: '',
    edit: '',
    search: ''
};

export const add = (data) => {
    let result = axios.post(api.add, data);
    return;
};
