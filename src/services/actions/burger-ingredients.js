export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAIL = 'FETCH_INGREDIENTS_FAIL';

const fetchRequest = () => ({type: FETCH_INGREDIENTS_REQUEST});
const fetchSuccess = (items) => ({type: FETCH_INGREDIENTS_SUCCESS, payload: items});
const fetchError = (error) => ({type: FETCH_INGREDIENTS_FAIL, payload: error});


export const fetchIngredients = () => async (dispatch) => {
    dispatch(fetchRequest());
    try {
        const res = await fetch('https://norma.nomoreparties.space/api/ingredients');

        if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          dispatch(fetchSuccess(data.data));
        }
        else {
          throw new Error('Полученные от сервера данные некорректны.')
        }
    } catch (err) {
        dispatch(fetchError(err.message));
    }
}