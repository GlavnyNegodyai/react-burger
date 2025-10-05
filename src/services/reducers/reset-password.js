import {
    RESET_PASSWORD_POST_REQUEST,
    RESET_PASSWORD_POST_SUCCESS,
    RESET_PASSWORD_POST_FAIL
} from '../actions/reset-password.js';

const initialState = {
    isResetPasswordLoading: false,
    resetPasswordError: null,
};

export const resetPasswordReducer = (state = initialState, action) => {
    switch(action.type){
        case RESET_PASSWORD_POST_REQUEST:
            return {
                ...state,
                isResetPasswordLoading: true,
                resetPasswordError: null,
            }
        case RESET_PASSWORD_POST_SUCCESS:
            return {
                ...state,
                isResetPasswordLoading: false,
            }
        case RESET_PASSWORD_POST_FAIL:
            return {
                ...state,
                resetPasswordError: action.payload,
                isResetPasswordLoading: false
            }
        default:
            return state;
    }
}

