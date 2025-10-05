import {
    FORGOT_PASSWORD_POST_REQUEST,
    FORGOT_PASSWORD_POST_SUCCESS,
    FORGOT_PASSWORD_POST_FAIL
} from '../actions/forgot-password.js';

const initialState = {
    isForgotPasswordLoading: false,
    forgotPasswordError: null,
    forgotPasswordServerReply: ''
};

export const forgotPasswordReducer = (state = initialState, action) => {
    switch(action.type){
        case FORGOT_PASSWORD_POST_REQUEST:
            return {
                ...state,
                isForgotPasswordLoading: true,
                forgotPasswordError: null,
                forgotPasswordServerReply: ''
            }
        case FORGOT_PASSWORD_POST_SUCCESS:
            return {
                ...state,
                isForgotPasswordLoading: false,
                forgotPasswordServerReply: action.payload
            }
        case FORGOT_PASSWORD_POST_FAIL:
            return {
                ...state,
                forgotPasswordError: action.payload,
                isForgotPasswordLoading: false
            }
        default:
            return state;
    }
}