import {v4 as uuid} from 'uuid';
export const CONSTRUCTOR_ADD_BUN = 'CONSTRUCTOR_ADD_BUN';
export const CONSTRUCTOR_ADD_INGREDIENT = 'CONSTRUCTOR_ADD_INGREDIENT';
export const CONSTRUCTOR_REMOVE_BUN = 'CONSTRUCTOR_REMOVE_BUN';
export const CONSTRUCTOR_REMOVE_INGREDIENT = 'CONSTRUCTOR_REMOVE_INGREDIENT';
export const CONSTRUCTOR_MOVE = 'CONSTRUCTOR_MOVE';
export const CONSTRUCTOR_CLEAR = 'CONSTRUCTOR_CLEAR';



export const handleCardDrop = (item) => (dispatch, getState) => {
    const allIngredients = getState().ingredientsReducer.ingredients;
    const ingredient = allIngredients.find(el => el._id === item.id);

    dispatch({
        type: ingredient.type === 'bun'? CONSTRUCTOR_ADD_BUN: CONSTRUCTOR_ADD_INGREDIENT, 
        payload: {...ingredient, uid:uuid()}
    });
}

export const handleRemoveIngredient = (indexToRemove) => (dispatch, getState) => {
    const constructorItems = getState().constructorReducer.constructorItems;
    const newConstructorItems = constructorItems.filter((element, index) => index !== indexToRemove);
    dispatch({type: CONSTRUCTOR_REMOVE_INGREDIENT, payload: newConstructorItems});
}

export const handleMoveConstructorElement = (fromIndex, toIndex) => (dispatch, getState) => {
    const constructorItems = getState().constructorReducer.constructorItems;
    const [movingElement] = constructorItems.splice(fromIndex, 1);
    constructorItems.splice(toIndex, 0, movingElement);

    dispatch({type: CONSTRUCTOR_MOVE, payload: constructorItems});
}

