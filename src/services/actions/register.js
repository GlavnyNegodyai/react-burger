import { setAccessToken, setRefreshToken } from '../../utils/auth-cookies.js';

export const REGISTER_POST_REQUEST = 'REGISTER_POST_REQUEST';
export const REGISTER_POST_SUCCESS = 'REGISTER_POST_SUCCESS';
export const REGISTER_POST_FAIL = 'REGISTER_POST_FAIL';

const registerUserRequest = () => ({type: REGISTER_POST_REQUEST});
const registerUserSuccess = () => ({type: REGISTER_POST_SUCCESS});
const registerUserError = (error) => ({type: REGISTER_POST_FAIL, payload: error});

export const registerUser = (newUserEmail, newUserPassword, newUserName) => async (dispatch) => {
    dispatch(registerUserRequest());
    try {
        const res = await fetch(
            'https://norma.nomoreparties.space/api/auth/register',
            {
                method: "POST",
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: JSON.stringify({
                    email: newUserEmail,
                    password: newUserPassword,
                    name: newUserName
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
            dispatch(registerUserSuccess());
            setAccessToken(data.accessToken.replace('Bearer ', ''));
            setRefreshToken(data.refreshToken);
        }
        else {
            throw new Error(`Ошибка: ${data.message}`)
        }        

    } catch (err) {
        dispatch(registerUserError(err.message));
    }
}