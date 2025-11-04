import { setAccessToken, setRefreshToken } from '../../utils/auth-cookies';
import { BASE_URL } from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';

export const LOGIN_POST_REQUEST = 'LOGIN_POST_REQUEST';
export const LOGIN_POST_SUCCESS = 'LOGIN_POST_SUCCESS';
export const LOGIN_POST_FAIL = 'LOGIN_POST_FAIL';

const loginUserRequest = () => ({type: LOGIN_POST_REQUEST});
const loginUserSuccess = () => ({type: LOGIN_POST_SUCCESS});
const loginUserError = (error) => ({type: LOGIN_POST_FAIL, payload: error});

export const loginUser = ({email, password, fromPage}, navigate) => async (dispatch) => {
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
        dispatch(loginUserError(err.message));
    }
}