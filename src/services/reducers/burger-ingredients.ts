import { TburgerIngredientsActions } from '../actions/burger-ingredients';
import { TIngredient } from '../types/data';


import {BURGER_INGREDIENTS_FETCH_FAIL, 
        BURGER_INGREDIENTS_FETCH_SUCCESS, 
        BURGER_INGREDIENTS_FETCH_REQUEST} 
from '../actions/burger-ingredients';

type TinitialState = {
    ingredients: TIngredient[];
    fetchLoading: boolean;
    fetchError: string | null;
};

const initialState: TinitialState = {
    ingredients: [],
    fetchLoading: false,
    fetchError: null
};

export const ingredientsReducer = (state = initialState, action: TburgerIngredientsActions) => {
    switch (action.type) {
        case BURGER_INGREDIENTS_FETCH_REQUEST:
            return {
                ...state, 
                fetchLoading: true,
                fetchError: null,
                ingredients: []
            };
        case BURGER_INGREDIENTS_FETCH_SUCCESS:
            return {
                ...state,
                fetchLoading: false,
                fetchError: null,
                ingredients: action.payload
            };
        case BURGER_INGREDIENTS_FETCH_FAIL:
            return {
                ...state,
                fetchLoading: false,
                fetchError: action.payload
            };
        default:
            return state;
    }
}