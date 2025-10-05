import { setAccessToken, setRefreshToken } from '../../utils/auth-cookies.js';
import { useNavigate } from 'react-router-dom';

export const LOGIN_POST_REQUEST = 'LOGIN_POST_REQUEST';
export const LOGIN_POST_SUCCESS = 'LOGIN_POST_SUCCESS';
export const LOGIN_POST_FAIL = 'LOGIN_POST_FAIL';

const loginUserRequest = () => ({type: LOGIN_POST_REQUEST});
const loginUserSuccess = () => ({type: LOGIN_POST_SUCCESS});
const loginUserError = (error) => ({type: LOGIN_POST_FAIL, payload: error});

export const loginUser = ({userEmail, userPassword, fromPage}, navigate) => async (dispatch) => {
    dispatch(loginUserRequest());
    try {
        const res = await fetch(
            'https://norma.nomoreparties.space/api/auth/login',
            {
                method: "POST",
                mode: 'cors',
                cache: 'no-cache',
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword
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
            dispatch(loginUserSuccess());
            setAccessToken(data.accessToken.replace('Bearer ', ''));
            setRefreshToken(data.refreshToken);
            navigate(fromPage);
        }
        else {
            throw new Error(`Ошибка: ${data.message}`)
        }

    } catch (err) {
        dispatch(loginUserError(err.message));
    }
}