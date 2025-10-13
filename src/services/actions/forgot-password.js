import {BASE_URL} from '../../utils/base-url.js';
import { checkResponse } from '../../utils/check-response.js';

export const FORGOT_PASSWORD_POST_REQUEST = 'FORGOT_PASSWORD_POST_REQUEST';
export const FORGOT_PASSWORD_POST_SUCCESS = 'FORGOT_PASSWORD_POST_SUCCESS';
export const FORGOT_PASSWORD_POST_FAIL = 'FORGOT_PASSWORD_POST_FAIL';

const emailPostRequest = () => ({type: FORGOT_PASSWORD_POST_REQUEST});
const emailPostSuccess = (message) => ({type: FORGOT_PASSWORD_POST_SUCCESS, payload: message});
const emailPostError = (error) => ({type: FORGOT_PASSWORD_POST_FAIL, payload: error});

export const emailPost = (userEmail, navigate) => async (dispatch) => {
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
        dispatch(emailPostError(err.message));
    }
}