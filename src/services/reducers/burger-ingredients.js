import {BURGER_INGREDIENTS_FETCH_FAIL, 
        BURGER_INGREDIENTS_FETCH_SUCCESS, 
        BURGER_INGREDIENTS_FETCH_REQUEST} 
from '../actions/burger-ingredients';

const initialState = {
    ingredients: [],
    fetchLoading: false,
    fetchError: null
};

export const ingredientsReducer = (state = initialState, action) => {
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