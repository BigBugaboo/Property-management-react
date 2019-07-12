import { ADMIN, USER } from '../constants/index';

const counterInitialState = {
    loginStatus: 0,
};

const loginStatus = (state = counterInitialState, action) => {
    switch (action.type) {
    case ADMIN:
        return { ...state, loginStatus: 0 };
    case USER:
        return { ...state, loginStatus: 1 };
    default:
        return state;
    }
};

export default loginStatus;
