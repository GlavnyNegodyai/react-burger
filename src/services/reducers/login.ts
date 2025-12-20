import { TloginPostActions } from '../actions/login';

import {
    LOGIN_POST_REQUEST,
    LOGIN_POST_SUCCESS,
    LOGIN_POST_FAIL
} from '../actions/login';

type TinitialState = {
    isLoginLoading: boolean;
    loginError: boolean;
};

export const initialState: TinitialState = {
    isLoginLoading: false,
    loginError: false,
};

export const loginReducer = (state = initialState, action: TloginPostActions) => {
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