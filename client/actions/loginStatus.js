import { ADMIN, USER } from '../constants/index';

export const admin = () => ({
    type: ADMIN,
    payload: {}
});

export const user = () => ({
    type: USER,
    payload: {}
});
