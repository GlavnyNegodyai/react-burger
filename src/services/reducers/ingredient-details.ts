import { TIngredient } from '../types/data';
import { TIngredientDetailsActions } from '../actions/ingredient-details';

import
    {ADD_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS
    } from '../actions/ingredient-details';

type TinitialState = {
    ingredient: TIngredient |null;
    detailsOpened: boolean;
};

export const initialState: TinitialState = {
    ingredient: null,
    detailsOpened: false
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
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
                ingredient: null
            }
        }
        default:
            return state;
    }
}