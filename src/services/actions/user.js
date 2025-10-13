import {getAccessToken, updateTokens, removeAccessToken, removeRefreshToken } from '../../utils/auth-cookies.js';
import { BASE_URL } from '../../utils/base-url.js';

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

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

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

            if (!retryResponse.ok) {
                throw new Error(`Ошибка сервера: ${retryResponse.status} ${retryResponse.statusText}`);
            }

            const retryData = await retryResponse.json();

            if (retryData.success) {
                dispatch(userSuccess(retryData.user));
                return;
            }
            else{
                throw new Error(retryData.message);
            }
        }

        if (!data.success){
            throw new Error(data.message);
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

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

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

            if (!retryResponse.ok) {
                throw new Error(`Ошибка сервера: ${retryResponse.status} ${retryResponse.statusText}`);
            }

            const retryData = await retryResponse.json();

            if (retryData.success) {
                dispatch(userSuccess(retryData.user));
                return;
            }
            else{
                throw new Error(retryData.message);
            }
        }

        if (!data.success){
            throw new Error(data.message);
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