import { INCREASE, DECREASE } from '../constants/index';

export const decrease = () => ({
    type: DECREASE,
    payload: {}
});

export const increase = () => ({
    type: INCREASE,
    payload: {}
});

export const asyncIncrease = () => async (dispatch, getState) => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        });
        dispatch(increase());
    }
    catch (error) {
        console.log(error);
    }
};

export const asyncDecrease = () => async (dispatch, getState) => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        });
        dispatch(decrease());
    }
    catch (error) {
        console.log(error);
    }
};
