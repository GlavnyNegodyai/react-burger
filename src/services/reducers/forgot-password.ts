import { TforgotPasswordPostActions } from '../actions/forgot-password';

import {
    FORGOT_PASSWORD_POST_REQUEST,
    FORGOT_PASSWORD_POST_SUCCESS,
    FORGOT_PASSWORD_POST_FAIL
} from '../actions/forgot-password';

type TinitialState = {
    isForgotPasswordLoading: boolean;
    forgotPasswordError: string | null;
    forgotPasswordServerReply: string;
};

const initialState: TinitialState = {
    isForgotPasswordLoading: false,
    forgotPasswordError: null,
    forgotPasswordServerReply: ''
};

export const forgotPasswordReducer = (state = initialState, action: TforgotPasswordPostActions) => {
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