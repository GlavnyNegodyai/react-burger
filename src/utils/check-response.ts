type ServerResponseType = Response & {
    data?: any;
    success?: boolean;
};

export const checkResponse = async (res: ServerResponseType) => {
    if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success){
        throw new Error(`Ошибка: ${res.status || 'Неизвестная ошибка'}`);
    }

    return data;
}