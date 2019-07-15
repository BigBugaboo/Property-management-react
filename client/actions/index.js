import { INCREASE,
    DECREASE,
    ADMIN,
    USER,
    SETNAME,
    REMOVENAME,
} from '../constants/index';

export const decrease = () => ({
    type: DECREASE,
    payload: {}
});

export const increase = () => ({
    type: INCREASE,
    payload: {}
});

export const admin = () => ({
    type: ADMIN,
    payload: {}
});

export const user = () => ({
    type: USER,
    payload: {}
});

export const setName = (value) => ({
    type: SETNAME,
    value: value,
});

export const removeName = () => ({
    type: REMOVENAME
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
