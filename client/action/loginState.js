import { INCREASE, DECREASE } from '../constants/index';

export const decrease = () => ({
    type: DECREASE,
    payload: {}
});

export const increase = () => ({
    type: INCREASE,
    payload: {}
});
