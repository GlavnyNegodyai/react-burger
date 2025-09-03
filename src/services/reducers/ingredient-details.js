import
    {ADD_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS
    } from '../actions/ingredient-details.js';

const initialState = {
    ingredient: [],
    detailsOpened: false
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_INGREDIENT_DETAILS: {
            return{
                ...state,
                detailsOpened: true,
                ingredient: action.payload
            }
        }
        case REMOVE_INGREDIENT_DETAILS: {
            return {
                ...state, 
                detailsOpened: false,
                ingredient: []
            }
        }
        default:
            return state;
    }
}