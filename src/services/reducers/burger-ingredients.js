import {FETCH_INGREDIENTS_FAIL, 
        FETCH_INGREDIENTS_SUCCESS, 
        FETCH_INGREDIENTS_REQUEST} 
from '../actions/burger-ingredients';

const initialState = {
    ingredients: [],
    fetchLoading: false,
    fetchError: null
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INGREDIENTS_REQUEST: {
            return {
                ...state, 
                fetchLoading: true,
                fetchError: null,
                ingredients: []
            }
        };
        case FETCH_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                fetchLoading: false,
                fetchError: null,
                ingredients: action.payload
            }
        };
        case FETCH_INGREDIENTS_FAIL: {
            return {
                ...state,
                fetchLoading: false,
                fetchError: action.payload
            }
        };
        default:
            return state;
    }
}