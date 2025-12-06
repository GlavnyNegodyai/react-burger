import {BASE_URL} from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';
import { TIngredient } from '../types/data';
import { AppThunk } from "../types";
import { AppDispatch } from "../types"; 

export const BURGER_INGREDIENTS_FETCH_REQUEST: 'BURGER_INGREDIENTS_FETCH_REQUEST' = 'BURGER_INGREDIENTS_FETCH_REQUEST';
export const BURGER_INGREDIENTS_FETCH_SUCCESS: 'BURGER_INGREDIENTS_FETCH_SUCCESS' = 'BURGER_INGREDIENTS_FETCH_SUCCESS';
export const BURGER_INGREDIENTS_FETCH_FAIL: 'BURGER_INGREDIENTS_FETCH_FAIL' = 'BURGER_INGREDIENTS_FETCH_FAIL';

export type TburgerIngredientsFetchRequestAction = {
    readonly type: typeof BURGER_INGREDIENTS_FETCH_REQUEST;
};

export type TburgerIngredientsFetchSuccessAction = {
    readonly type: typeof BURGER_INGREDIENTS_FETCH_SUCCESS;
    readonly payload : TIngredient[];
};

export type TburgerIngredientsFetchFailAction = {
    readonly type: typeof BURGER_INGREDIENTS_FETCH_FAIL;
    readonly payload: string; 
};

export type TburgerIngredientsActions = 
    TburgerIngredientsFetchRequestAction |
    TburgerIngredientsFetchSuccessAction |
    TburgerIngredientsFetchFailAction;

const fetchRequest = (): TburgerIngredientsFetchRequestAction => ({type: BURGER_INGREDIENTS_FETCH_REQUEST});
const fetchSuccess = (items: TIngredient[]): TburgerIngredientsFetchSuccessAction => ({type: BURGER_INGREDIENTS_FETCH_SUCCESS, payload: items});
const fetchError = (error: string): TburgerIngredientsFetchFailAction => ({type: BURGER_INGREDIENTS_FETCH_FAIL, payload: error});


export const fetchIngredients: AppThunk = () => async (dispatch: AppDispatch) => {
    dispatch(fetchRequest());
    try {
        const res = await fetch(`${BASE_URL}/ingredients`);

        const data = await checkResponse(res);

        dispatch(fetchSuccess(data.data));

    } catch (err) {
        if (err instanceof Error) {
        dispatch(fetchError(err.message));
        }
        else {
            dispatch(fetchError('Unknown error'));
        }
    }
}