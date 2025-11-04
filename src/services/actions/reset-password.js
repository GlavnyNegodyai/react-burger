import { BASE_URL } from '../../utils/base-url.js';
import { checkResponse } from '../../utils/check-response.js';

export const RESET_PASSWORD_POST_REQUEST = 'RESET_PASSWORD_POST_REQUEST';
export const RESET_PASSWORD_POST_SUCCESS = 'RESET_PASSWORD_POST_SUCCESS';
export const RESET_PASSWORD_POST_FAIL = 'RESET_PASSWORD_POST_FAIL';

const passwordResetRequest = () => ({type: RESET_PASSWORD_POST_REQUEST});
const passwordResetSuccess = () => ({type: RESET_PASSWORD_POST_SUCCESS});
const passwordResetError = (error) => ({type: RESET_PASSWORD_POST_FAIL, payload: error});

export const passwordReset = (newPassword, emailedToken, navigate) => async (dispatch) => {
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
        dispatch(passwordResetError(err.message));
    }
}