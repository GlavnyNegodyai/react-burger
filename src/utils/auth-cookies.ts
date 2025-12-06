import Cookies from 'js-cookie';
import { BASE_URL } from './base-url';
import { checkResponse } from './check-response';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

type TokenType = string;

export const setAccessToken = (token: TokenType, minutes = 20) => {
    Cookies.set(ACCESS_TOKEN_KEY,
        token, 
        {
            expires: minutes / (60 * 24),
            path: '/',
            secure: true,
            sameSite: 'Strict'
        }
    );
};

export const getAccessToken = () => {
    return Cookies.get(ACCESS_TOKEN_KEY);
}

export const removeAccessToken  = () => {
    Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
}


export const setRefreshToken = (token: TokenType) => {
    Cookies.set(REFRESH_TOKEN_KEY,
        token, 
        {
            expires: 365 * 100,
            path: '/',
            secure: true,
            sameSite: 'Strict'
        }
    );
};

export const getRefreshToken = () => {
    return Cookies.get(REFRESH_TOKEN_KEY);
}

export const removeRefreshToken  = () => {
    Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
}


export const updateTokens = async () => {
    console.log("Token invalid. Trying updating tokens...");
    try{
        const response = await fetch(`${BASE_URL}/auth/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: getRefreshToken(),
            }),
        });

        const data = await checkResponse(response);

        if (!data.accessToken || !data.refreshToken) {
            throw new Error("Некорректный ответ сервера при обновлении токена");
        }

        const newAccessToken = data.accessToken.replace('Bearer ', '');
        const newRefreshToken = data.refreshToken;
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        return newAccessToken;
    }
    catch (error){
        console.error('Ошибка при обновлении токена', error);
        throw error;
    }
}