import {
    INCREASE,
    DECREASE,
    SETNAME,
    REMOVENAME,
    ADMIN,
    USER,
} from '../constants/index';

const InitialState = {
    count: 0,
    name: '',
    loginStatus: 0,
};

const counter = (state = InitialState, action) => {
    switch (action.type) {
    case INCREASE:
        return { ...state, count: state.count + 1 };
    case DECREASE:
        return { ...state, count: state.count - 1 };
    case SETNAME:
        return { ...state, name: action.value };
    case REMOVENAME:
        return { ...state, name: null };
    case ADMIN:
        return { ...state, loginStatus: 0 };
    case USER:
        return { ...state, loginStatus: 1 };
    default:
        return state;
    }
};

export default counter;
