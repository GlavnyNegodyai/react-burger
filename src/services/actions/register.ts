import { setAccessToken, setRefreshToken } from '../../utils/auth-cookies';
import { BASE_URL } from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';
import { AppThunk } from "../types";
import { AppDispatch } from "../types"; 

export const REGISTER_POST_REQUEST: 'REGISTER_POST_REQUEST' = 'REGISTER_POST_REQUEST';
export const REGISTER_POST_SUCCESS: 'REGISTER_POST_SUCCESS' = 'REGISTER_POST_SUCCESS';
export const REGISTER_POST_FAIL: 'REGISTER_POST_FAIL' = 'REGISTER_POST_FAIL';

export type TregisterPostRequestAction = {
    readonly type: typeof REGISTER_POST_REQUEST;
};

export type TregisterPostSuccessAction = {
    readonly type: typeof REGISTER_POST_SUCCESS;
};

export type TregisterPostFailAction = {
    readonly type: typeof REGISTER_POST_FAIL;
    readonly payload: string;
};

export type TregisterPostActions = 
    TregisterPostRequestAction | 
    TregisterPostSuccessAction | 
    TregisterPostFailAction ;

const registerUserRequest = (): TregisterPostRequestAction => ({type: REGISTER_POST_REQUEST});
const registerUserSuccess = (): TregisterPostSuccessAction => ({type: REGISTER_POST_SUCCESS});
const registerUserError = (error: string): TregisterPostFailAction => ({type: REGISTER_POST_FAIL, payload: error});

export const registerUser: AppThunk = ({email, password, name}, navigate) => async (dispatch: AppDispatch) => {
    dispatch(registerUserRequest());
    try {
        const res = await fetch(
            `${BASE_URL}/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                }),
        });

        const data = await checkResponse(res);

        dispatch(registerUserSuccess());
        setAccessToken(data.accessToken.replace('Bearer ', ''));
        setRefreshToken(data.refreshToken);
        navigate('/', {replace: true});        

    } catch (err) {
        if (err instanceof Error){
            dispatch(registerUserError(err.message));
        }
        else{
            dispatch(registerUserError('Unknown error'));
        }
    }
}