import { setAccessToken, setRefreshToken } from '../../utils/auth-cookies';
import { BASE_URL } from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';

export const REGISTER_POST_REQUEST = 'REGISTER_POST_REQUEST';
export const REGISTER_POST_SUCCESS = 'REGISTER_POST_SUCCESS';
export const REGISTER_POST_FAIL = 'REGISTER_POST_FAIL';

const registerUserRequest = () => ({type: REGISTER_POST_REQUEST});
const registerUserSuccess = () => ({type: REGISTER_POST_SUCCESS});
const registerUserError = (error) => ({type: REGISTER_POST_FAIL, payload: error});

export const registerUser = ({email, password, name}, navigate) => async (dispatch) => {
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
        dispatch(registerUserError(err.message));
    }
}