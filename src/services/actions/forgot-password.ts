import {BASE_URL} from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';
import { AppThunk } from "../types";
import { AppDispatch } from "../types"; 

export const FORGOT_PASSWORD_POST_REQUEST: 'FORGOT_PASSWORD_POST_REQUEST' = 'FORGOT_PASSWORD_POST_REQUEST';
export const FORGOT_PASSWORD_POST_SUCCESS: 'FORGOT_PASSWORD_POST_SUCCESS' = 'FORGOT_PASSWORD_POST_SUCCESS';
export const FORGOT_PASSWORD_POST_FAIL: 'FORGOT_PASSWORD_POST_FAIL' = 'FORGOT_PASSWORD_POST_FAIL';

export type TforgotPasswordPostRequestAction = {
    readonly type: typeof FORGOT_PASSWORD_POST_REQUEST;
};

export type TforgotPasswordPostSuccessAction = {
    readonly type: typeof FORGOT_PASSWORD_POST_SUCCESS;
    readonly payload: string;
};

export type TforgotPasswordPostFailAction = {
    readonly type: typeof FORGOT_PASSWORD_POST_FAIL;
    readonly payload: string;
};

export type TforgotPasswordPostActions = 
    TforgotPasswordPostRequestAction | 
    TforgotPasswordPostSuccessAction | 
    TforgotPasswordPostFailAction ;

const emailPostRequest = (): TforgotPasswordPostRequestAction => ({type: FORGOT_PASSWORD_POST_REQUEST});
const emailPostSuccess = (message: string): TforgotPasswordPostSuccessAction => ({type: FORGOT_PASSWORD_POST_SUCCESS, payload: message});
const emailPostError = (error: string): TforgotPasswordPostFailAction => ({type: FORGOT_PASSWORD_POST_FAIL, payload: error});

export const emailPost: AppThunk = (userEmail, navigate) => async (dispatch: AppDispatch) => {
    dispatch(emailPostRequest());
    try {
        const res = await fetch(`${BASE_URL}/password-reset`, {
            method: "POST",
            body: JSON.stringify({
                email: userEmail
            }),
              headers: {
                "Content-type": "application/json"
            },
        });

        const data = await checkResponse(res);

        dispatch(emailPostSuccess(data.message));
        navigate('/reset-password', {state: {fromForgotPassword: true}});
    
      } catch (err) {
        if (err instanceof Error) {
        dispatch(emailPostError(err.message));
        }
        else {
            dispatch(emailPostError('Unknown error'));
        }
    }
}