import { TIngredient } from '../types/data';
export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS: 'REMOVE_INGREDIENT_DETAILS' = 'REMOVE_INGREDIENT_DETAILS';

export type TaddIngredientDetailsAction = {
    readonly type: typeof ADD_INGREDIENT_DETAILS;
    readonly payload: TIngredient; 
};

export type TRemoveIngredientDetailsAction = {
    readonly type: typeof REMOVE_INGREDIENT_DETAILS; 
};

export type TIngredientDetailsActions =
  | TaddIngredientDetailsAction
  | TRemoveIngredientDetailsAction;