import { BASE_URL } from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';
import { AppThunk } from "../types";
import { AppDispatch } from "../types"; 

export const RESET_PASSWORD_POST_REQUEST: 'RESET_PASSWORD_POST_REQUEST' = 'RESET_PASSWORD_POST_REQUEST';
export const RESET_PASSWORD_POST_SUCCESS: 'RESET_PASSWORD_POST_SUCCESS' = 'RESET_PASSWORD_POST_SUCCESS';
export const RESET_PASSWORD_POST_FAIL: 'RESET_PASSWORD_POST_FAIL' = 'RESET_PASSWORD_POST_FAIL';

export type TresetPasswordPostRequestAction = {
    readonly type: typeof RESET_PASSWORD_POST_REQUEST;
};

export type TresetPasswordPostSuccessAction = {
    readonly type: typeof RESET_PASSWORD_POST_SUCCESS;
};

export type TresetPasswordPostFailAction = {
    readonly type: typeof RESET_PASSWORD_POST_FAIL;
    readonly payload: string;
};

export type TresetPasswordPostActions = 
    TresetPasswordPostRequestAction | 
    TresetPasswordPostSuccessAction | 
    TresetPasswordPostFailAction;

const passwordResetRequest = (): TresetPasswordPostRequestAction => ({type: RESET_PASSWORD_POST_REQUEST});
const passwordResetSuccess = (): TresetPasswordPostSuccessAction => ({type: RESET_PASSWORD_POST_SUCCESS});
const passwordResetError = (error: string): TresetPasswordPostFailAction => ({type: RESET_PASSWORD_POST_FAIL, payload: error});

export const passwordReset: AppThunk = (newPassword, emailedToken, navigate) => async (dispatch: AppDispatch) => {
    dispatch(passwordResetRequest());
    try {
        const res = await fetch(`${BASE_URL}/password-reset/reset`, {
            method: "POST",
            body: JSON.stringify({
                password: newPassword,
                token: emailedToken
            }),
              headers: {
                "Content-type": "application/json"
            },
        });

        const data = await checkResponse(res);

        dispatch(passwordResetSuccess());
        navigate('/', {replace: true});
    } catch (err) {
        if (err instanceof Error) {
            dispatch(passwordResetError(err.message));
        }
        else {
            dispatch(passwordResetError('Unknown error'));
        }
    }
}