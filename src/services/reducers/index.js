import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients.js';
import { constructorReducer } from './burger-constructor.js';
import { ingredientDetailsReducer } from './ingredient-details.js';
import { orderReducer } from './order-details.js';
import { forgotPasswordReducer } from './forgot-password.js';
import { resetPasswordReducer } from './reset-password.js';
import { registerReducer } from './register.js';
import { loginReducer } from './login.js';
import { userReducer } from './user.js';
 

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    orderReducer,
    ingredientDetailsReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    registerReducer,
    loginReducer,
    userReducer
});