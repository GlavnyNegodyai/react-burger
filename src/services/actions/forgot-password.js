export const FORGOT_PASSWORD_POST_REQUEST = 'FORGOT_PASSWORD_POST_REQUEST';
export const FORGOT_PASSWORD_POST_SUCCESS = 'FORGOT_PASSWORD_POST_SUCCESS';
export const FORGOT_PASSWORD_POST_FAIL = 'FORGOT_PASSWORD_POST_FAIL';

const emailPostRequest = () => ({type: FORGOT_PASSWORD_POST_REQUEST});
const emailPostSuccess = (message) => ({type: FORGOT_PASSWORD_POST_SUCCESS, payload: message});
const emailPostError = (error) => ({type: FORGOT_PASSWORD_POST_FAIL, payload: error});

export const emailPost = (userEmail, navigate) => async (dispatch) => {
    dispatch(emailPostRequest());
    try {
        const res = await fetch('https://norma.nomoreparties.space/api/password-reset', {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: JSON.stringify({
                email: userEmail
            }),
              headers: {
                "Content-type": "application/json"
            },
            referrerPolicy: 'no-referrer'
        });

        const data = await res.json();

        if (!res.ok) {
        throw new Error(`Ошибка: ${res.status} "${data.message}"`);
        }

        if (data.success) {
          dispatch(emailPostSuccess(data.message));
          navigate('/reset-password', {state: {fromForgotPassword: true}});
        }
        else {
          throw new Error(`Ошибка: ${data.message}`)
        }
    } catch (err) {
        dispatch(emailPostError(err.message));
    }
}