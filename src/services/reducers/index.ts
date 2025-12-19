import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order-details';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { registerReducer } from './register';
import { loginReducer } from './login';
import { userReducer } from './user';
import { allFeedReducer } from './all-orders-feed';
import { userFeedReducer } from './user-orders-feed'; 
import { orderCompositionReducer } from './order-composition';
 

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    orderReducer,
    ingredientDetailsReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    registerReducer,
    loginReducer,
    userReducer,
    allFeedReducer,
    userFeedReducer,
    orderCompositionReducer
});