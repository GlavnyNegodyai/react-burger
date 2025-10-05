import {
    LOGIN_POST_REQUEST,
    LOGIN_POST_SUCCESS,
    LOGIN_POST_FAIL
} from '../actions/login.js';

const initialState = {
    isLoginLoading: false,
    loginError: false,
};

export const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_POST_REQUEST:
            return {
                ...state,
                isLoginLoading: true,
                loginError: false,
            }
        case LOGIN_POST_SUCCESS:
            return {
                ...state,
                isLoginLoading: false,
            }
        case LOGIN_POST_FAIL:
            return {
                ...state,
                loginError: true,
                isLoginLoading: false
            }
        default:
            return state;
    }
}