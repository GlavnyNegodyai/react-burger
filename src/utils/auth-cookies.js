import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const setAccessToken = (token, minutes = 20) => {
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


export const setRefreshToken = (token) => {
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
    try{
        const response = await fetch('https://norma.nomoreparties.space/api/auth/token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: getRefreshToken(),
            }),
        });

        if (!response.ok){
            throw new Error('Ошибка', response.status, response.statusText);
        }

        const data = await response.json();

        if (!data.success){
            throw new Error('Не удалось обновить токен');
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