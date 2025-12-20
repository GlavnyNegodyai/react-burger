import
    {ADD_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS
    } from '../actions/ingredient-details';

import { initialState, ingredientDetailsReducer} from './ingredient-details';

import { ingredient1 as ingredient} from '../../jest-constants/reducer-jest-constants';

describe("ingredientDetailsReducer", () => {
    it("Добавить инфу об ингредиенте и задать detailsOpened: true", ()=> {
        const action = {type: ADD_INGREDIENT_DETAILS, payload: ingredient};
        const newState = ingredientDetailsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            detailsOpened: true,
            ingredient: action.payload
        })
    });
    it("Убрать инфу об ингредиенте и задать detailsOpened: false", ()=> {
        const action = {type: REMOVE_INGREDIENT_DETAILS};
        const newState = ingredientDetailsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            detailsOpened: false,
            ingredient: null
        })
    });
    it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
        const action = { type: "UNKNOWN_ACTION" } as any;
        const newState = ingredientDetailsReducer(initialState, action);
        expect(newState).toEqual(initialState);
    });
});

