import {getAccessToken, updateTokens, removeAccessToken, removeRefreshToken } from '../../utils/auth-cookies.js';
import { BASE_URL } from '../../utils/base-url.js';
import { checkResponse } from '../../utils/check-response.js';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAIL = 'USER_FAIL';
export const USER_REMOVE = 'USER_REMOVE';

const userRequest = () => ({type: USER_REQUEST});
const userSuccess = (user) => ({type: USER_SUCCESS, payload: user});
const userError = (error) => ({type: USER_FAIL, payload: error});
const userRemove = () => ({type: USER_REMOVE});

export const getUser = () => async (dispatch) => {
    dispatch(userRequest());
    try{
        const response = await fetch(`${BASE_URL}/auth/user`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${getAccessToken()}`,
                },
            }
        );

        const data = await checkResponse(response);

        if (data.message === 'jwt expired' || data.message === 'jwt malformed'){
            const newToken = await updateTokens();

            const retryResponse = await fetch(`${BASE_URL}/auth/user`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${newToken}`,
                    },
                }
            );

            const retryData = await checkResponse(retryResponse);

            dispatch(userSuccess(retryData.user));
            return;
        }

        dispatch(userSuccess(data.user));

    }
    catch (error) {
        console.error(error);
        dispatch(userError(error.message));
    };
};

export const updateUser = (email, name) => async (dispatch) => {
    dispatch(userRequest());
    try{
        const response = await fetch(`${BASE_URL}/auth/user`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({
                    email: email,
                    name: name
                })
            }
        );

        const data = await checkResponse(response);

        if (data.message === 'jwt expired' || data.message === 'jwt malformed'){
            const newToken = await updateTokens();

            const retryResponse = await fetch(`${BASE_URL}/auth/user`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${newToken}`,
                    },
                }
            );

            const retryData = await checkResponse(retryResponse);

            dispatch(userSuccess(retryData.user));
            return;

        }

        dispatch(userSuccess(data.user));

    }
    catch (error) {
        dispatch(userError(error.message));
    };

};

export const removeUser = (navigate) => (dispatch) => {
    removeAccessToken();
    removeRefreshToken();
    dispatch(userRemove());
    navigate('/');
}