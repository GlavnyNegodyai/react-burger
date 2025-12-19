import { setAccessToken, setRefreshToken } from '../../utils/auth-cookies';
import { BASE_URL } from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';
import { AppThunk } from "../types";
import { AppDispatch } from "../types"; 

export const LOGIN_POST_REQUEST: 'LOGIN_POST_REQUEST' = 'LOGIN_POST_REQUEST';
export const LOGIN_POST_SUCCESS: 'LOGIN_POST_SUCCESS' = 'LOGIN_POST_SUCCESS';
export const LOGIN_POST_FAIL: 'LOGIN_POST_FAIL' = 'LOGIN_POST_FAIL';

export type TloginPostRequestAction = {
    readonly type: typeof LOGIN_POST_REQUEST;
};

export type TloginPostSuccessAction = {
    readonly type: typeof LOGIN_POST_SUCCESS;
};

export type TloginPostFailAction = {
    readonly type: typeof LOGIN_POST_FAIL;
    readonly payload: string;
};

export type TloginPostActions = 
    TloginPostRequestAction | 
    TloginPostSuccessAction | 
    TloginPostFailAction ;

const loginUserRequest = (): TloginPostRequestAction => ({type: LOGIN_POST_REQUEST});
const loginUserSuccess = (): TloginPostSuccessAction => ({type: LOGIN_POST_SUCCESS});
const loginUserError = (error: string): TloginPostFailAction => ({type: LOGIN_POST_FAIL, payload: error});

export const loginUser: AppThunk = ({email, password, fromPage}, navigate) => async (dispatch: AppDispatch) => {
    dispatch(loginUserRequest());

    try {
        const res = await fetch(
            `${BASE_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            
        const data = await checkResponse(res);
        
        dispatch(loginUserSuccess());
        setAccessToken(data.accessToken.replace('Bearer ', ''));
        setRefreshToken(data.refreshToken);
        navigate(fromPage);

    } catch (err) {
        if (err instanceof Error) {
        dispatch(loginUserError(err.message));
        }
        else {
            dispatch(loginUserError('Unknown error'));
        }
    }
}