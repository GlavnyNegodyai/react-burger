export const checkResponse = async (res) => {
    if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success){
        throw new Error(`Ошибка: ${res.status || 'Неизвестная ошибка'}`);
    }

    return data;
}