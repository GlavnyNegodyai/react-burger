import {
    REGISTER_POST_REQUEST,
    REGISTER_POST_SUCCESS,
    REGISTER_POST_FAIL
} from '../actions/register.js';

const initialState = {
    isRegisterLoading: false,
    registerError: null,
};

export const registerReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_POST_REQUEST:
            return {
                ...state,
                isRegisterLoading: true,
                registerError: false,
            }
        case REGISTER_POST_SUCCESS:
            return {
                ...state,
                isRegisterLoading: false,
            }
        case REGISTER_POST_FAIL:
            return {
                ...state,
                registerError: action.payload,
                isRegisterLoading: false
            }
        default:
            return state;
    }
}