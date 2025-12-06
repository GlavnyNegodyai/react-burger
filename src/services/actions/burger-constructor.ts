import { AppThunk } from "../types";
import { TIngredient, TConstructorIngredient } from "../types/data";
import { AppDispatch } from "../types"; 
import { v4 as uuid } from "uuid";
export const CONSTRUCTOR_ADD_BUN: "CONSTRUCTOR_ADD_BUN" = "CONSTRUCTOR_ADD_BUN";
export const CONSTRUCTOR_ADD_INGREDIENT: "CONSTRUCTOR_ADD_INGREDIENT" =
  "CONSTRUCTOR_ADD_INGREDIENT";
export const CONSTRUCTOR_REMOVE_BUN: "CONSTRUCTOR_REMOVE_BUN" =
  "CONSTRUCTOR_REMOVE_BUN";
export const CONSTRUCTOR_REMOVE_INGREDIENT: "CONSTRUCTOR_REMOVE_INGREDIENT" =
  "CONSTRUCTOR_REMOVE_INGREDIENT";
export const CONSTRUCTOR_MOVE: "CONSTRUCTOR_MOVE" = "CONSTRUCTOR_MOVE";
export const CONSTRUCTOR_CLEAR: "CONSTRUCTOR_CLEAR" = "CONSTRUCTOR_CLEAR";

type TconstructorAddBunAction = {
  readonly type: typeof CONSTRUCTOR_ADD_BUN;
  readonly payload: TConstructorIngredient;
};

type TconstructorAddIngredientAction = {
  readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT;
  readonly payload: TConstructorIngredient;
};

type TconstructorRemoveBunAction = {
  readonly type: typeof CONSTRUCTOR_REMOVE_BUN;
};

type TconstructorRemoveIngredientAction = {
  readonly type: typeof CONSTRUCTOR_REMOVE_INGREDIENT;
  readonly payload: TConstructorIngredient[];
};

type TconstructorMoveAction = {
  readonly type: typeof CONSTRUCTOR_MOVE;
  readonly payload: TConstructorIngredient[];
};

type TconstructorClearAction = {
  readonly type: typeof CONSTRUCTOR_CLEAR;
};

export type TconstructorActions =
  | TconstructorAddBunAction
  | TconstructorAddIngredientAction
  | TconstructorRemoveBunAction
  | TconstructorRemoveIngredientAction
  | TconstructorMoveAction
  | TconstructorClearAction;

export const handleCardDrop: AppThunk = (item) => (dispatch: AppDispatch, getState) => {
  const allIngredients = getState().ingredientsReducer.ingredients;
  const ingredient = allIngredients.find((el) => el._id === item.id);
  if (!ingredient) return;
  dispatch({
    type:
      ingredient.type === "bun"
        ? CONSTRUCTOR_ADD_BUN
        : CONSTRUCTOR_ADD_INGREDIENT,
    payload: { ...ingredient, uid: uuid() },
  });
};

export const handleRemoveIngredient: AppThunk =
  (indexToRemove) => (dispatch: AppDispatch, getState) => {
    const constructorItems = getState().constructorReducer.constructorItems;
    const newConstructorItems = constructorItems.filter(
      (element, index) => index !== indexToRemove
    );
    dispatch({
      type: CONSTRUCTOR_REMOVE_INGREDIENT,
      payload: newConstructorItems,
    });
  };

export const handleMoveConstructorElement: AppThunk =
  (fromIndex, toIndex) => (dispatch: AppDispatch, getState) => {
    const constructorItems = getState().constructorReducer.constructorItems;
    const [movingElement] = constructorItems.splice(fromIndex, 1);
    constructorItems.splice(toIndex, 0, movingElement);

    dispatch({ type: CONSTRUCTOR_MOVE, payload: constructorItems });
  };
