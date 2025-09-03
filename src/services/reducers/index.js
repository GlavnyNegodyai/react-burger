import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients.js';
import { constructorReducer } from './burger-constructor.js';
import { ingredientDetailsReducer } from './ingredient-details.js';
import { orderReducer } from './order-details.js';


export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    orderReducer,
    ingredientDetailsReducer
});