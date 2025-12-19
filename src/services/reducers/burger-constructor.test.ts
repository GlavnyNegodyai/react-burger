import { constructorReducer, initialState } from "./burger-constructor";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_REMOVE_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_MOVE,
  CONSTRUCTOR_CLEAR,
} from "../actions/burger-constructor";

import { ingredient1, ingredient2, bun } from "../../jest-constants/reducer-jest-constants";

const testIngredient1 = {...ingredient1, uid: 'uid1'};

const testIngredient2 = {...ingredient2, uid: 'uid2'};

const testBun = {...bun, uid: 'bunUid'};

describe("constructorReducer", () => {
  it("Должен добавить инфу по булке", () => {
    const action = { type: CONSTRUCTOR_ADD_BUN, payload: testBun };
    const newState = constructorReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      constructorBun: testBun,
    });
  });

  it("Должен убрать инфу по булке", () => {
    const action = { type: CONSTRUCTOR_REMOVE_BUN };
    const newState = constructorReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      constructorBun: null,
    });
  });

  it("Должен добавить инфу по ингредиенту", () => {
    const action = { type: CONSTRUCTOR_ADD_INGREDIENT, payload: testIngredient1 };
    const newState = constructorReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      constructorItems: [testIngredient1],
    });
  });

  it("Должен убрать инфу по ингредиенту", () => {
    const prevState = {
      ...initialState,
      constructorItems: [testIngredient1, testIngredient2],
    };
    const newIngredientsArray = [testIngredient2];
    const action = {
      type: CONSTRUCTOR_REMOVE_INGREDIENT,
      payload: newIngredientsArray,
    };
    const newState = constructorReducer(prevState, action);

    expect(newState).toEqual({
      ...initialState,
      constructorItems: newIngredientsArray,
    });
  });

  it("Должен очистить конструктор", () => {
    const state = {
      ...initialState,
      constructorItems: [testIngredient1, testIngredient2],
      constructorBun: testBun,
    };
    const action = { type: CONSTRUCTOR_CLEAR };
    const newState = constructorReducer(state, action);

    expect(newState).toEqual({
      ...initialState,
      constructorItems: [],
      constructorBun: null,
    });
  });

  it("Должен переставить ингредиенты местами", () => {
    const prevState = {
      ...initialState,
      constructorItems: [testIngredient1, testIngredient2],
    };
    const movedArray = [testIngredient2, testIngredient1];
    const action = { type: CONSTRUCTOR_MOVE, payload: movedArray };
    const newState = constructorReducer(prevState, action);

    expect(newState).toEqual({
      ...initialState,
      constructorItems: movedArray,
    });
  });
  it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = constructorReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

