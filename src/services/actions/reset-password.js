export const RESET_PASSWORD_POST_REQUEST = 'RESET_PASSWORD_POST_REQUEST';
export const RESET_PASSWORD_POST_SUCCESS = 'RESET_PASSWORD_POST_SUCCESS';
export const RESET_PASSWORD_POST_FAIL = 'RESET_PASSWORD_POST_FAIL';

const passwordResetRequest = () => ({type: RESET_PASSWORD_POST_REQUEST});
const passwordResetSuccess = () => ({type: RESET_PASSWORD_POST_SUCCESS});
const passwordResetError = (error) => ({type: RESET_PASSWORD_POST_FAIL, payload: error});

export const passwordReset = (newPassword, emailedToken) => async (dispatch) => {
    dispatch(passwordResetRequest());
    try {
        const res = await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: JSON.stringify({
                password: newPassword,
                token: emailedToken
            }),
              headers: {
                "Content-type": "application/json"
            },
            referrerPolicy: 'no-referrer'
        });


        if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
            dispatch(passwordResetSuccess());
        }
        else {
            throw new Error(`Ошибка: ${data.message}`)
        }


    } catch (err) {
        dispatch(passwordResetError(err.message));
    }
}