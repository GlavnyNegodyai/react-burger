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
            }
        case USER_FAIL: 
            return{
                ...state,
                isUserLoading: false,
                userError: action.payload,
            }
        case USER_REMOVE: 
            return{
                ...state,
                user: {}
            }
        default: return state;
    }
}