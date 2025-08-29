export const BURGER_INGREDIENTS_FETCH_REQUEST = 'BURGER_INGREDIENTS_FETCH_REQUEST';
export const BURGER_INGREDIENTS_FETCH_SUCCESS = 'BURGER_INGREDIENTS_FETCH_SUCCESS';
export const BURGER_INGREDIENTS_FETCH_FAIL = 'BURGER_INGREDIENTS_FETCH_FAIL';

const fetchRequest = () => ({type: BURGER_INGREDIENTS_FETCH_REQUEST});
const fetchSuccess = (items) => ({type: BURGER_INGREDIENTS_FETCH_SUCCESS, payload: items});
const fetchError = (error) => ({type: BURGER_INGREDIENTS_FETCH_FAIL, payload: error});


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