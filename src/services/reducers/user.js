import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,
    USER_REMOVE
} from '../actions/user.js';

const initialState = {
    user: {},
    isUserLoading: false,
    userError: null,
    isUserLoggedIn: false
};

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_REQUEST: 
            return{
                ...state,
                isUserLoading: true,
                userError: null
            }
        case USER_SUCCESS:
            return{
                ...state,
                user: action.payload,
                isUserLoading: false,
                isUserLoggedIn: true
            }
        case USER_FAIL: 
            return{
                ...state,
                isUserLoading: false,
                userError: action.payload,
                isUserLoggedIn: false
            }
        case USER_REMOVE: 
            return{
                ...state,
                user: {},
                isUserLoggedIn: false
            }
        default: return state;
    }
}