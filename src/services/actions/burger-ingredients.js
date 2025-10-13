import {BASE_URL} from '../../utils/base-url.js';
import { checkResponse } from '../../utils/check-response.js';

export const BURGER_INGREDIENTS_FETCH_REQUEST = 'BURGER_INGREDIENTS_FETCH_REQUEST';
export const BURGER_INGREDIENTS_FETCH_SUCCESS = 'BURGER_INGREDIENTS_FETCH_SUCCESS';
export const BURGER_INGREDIENTS_FETCH_FAIL = 'BURGER_INGREDIENTS_FETCH_FAIL';

const fetchRequest = () => ({type: BURGER_INGREDIENTS_FETCH_REQUEST});
const fetchSuccess = (items) => ({type: BURGER_INGREDIENTS_FETCH_SUCCESS, payload: items});
const fetchError = (error) => ({type: BURGER_INGREDIENTS_FETCH_FAIL, payload: error});


export const fetchIngredients = () => async (dispatch) => {
    dispatch(fetchRequest());
    try {
        const res = await fetch(`${BASE_URL}/ingredients`);

        const data = await checkResponse(res);

        dispatch(fetchSuccess(data.data));

    } catch (err) {
        dispatch(fetchError(err.message));
    }
}