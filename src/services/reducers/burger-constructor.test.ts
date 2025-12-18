import { constructorReducer, initialState } from "./burger-constructor";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_REMOVE_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_MOVE,
  CONSTRUCTOR_CLEAR,
} from "../actions/burger-constructor";

const bun = {
  _id: "01",
  name: "someBun",
  type: "bun",
  proteins: 0,
  fat: 100,
  carbohydrates: 0,
  calories: 0,
  price: 1000,
  image: "string",
  image_mobile: "string",
  image_large: "string",
  __v: 1,
  uid: "uid",
};

const ingredient1 = {
  _id: "01",
  name: "someIngr",
  type: "ingredient",
  proteins: 0,
  fat: 100,
  carbohydrates: 0,
  calories: 0,
  price: 1000,
  image: "string",
  image_mobile: "string",
  image_large: "string",
  __v: 1,
  uid: "uid1",
};

const ingredient2 = {
  _id: "02",
  name: "someIngr2",
  type: "ingredient",
  proteins: 1,
  fat: 101,
  carbohydrates: 1,
  calories: 1,
  price: 1001,
  image: "string",
  image_mobile: "string",
  image_large: "string",
  __v: 2,
  uid: "uid2",
};

describe("constructorReducer", () => {
  it("Должен добавить инфу по булке", () => {
    const action = { type: CONSTRUCTOR_ADD_BUN, payload: bun };
    const newState = constructorReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      constructorBun: bun,
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
    const action = { type: CONSTRUCTOR_ADD_INGREDIENT, payload: ingredient1 };
    const newState = constructorReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      constructorItems: [ingredient1],
    });
  });

  it("Должен убрать инфу по ингредиенту", () => {
    const prevState = {
      ...initialState,
      constructorIngredients: [ingredient1, ingredient2],
    };
    const newIngredientsArray = [ingredient2];
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
      constructorItems: [ingredient1, ingredient2],
      constructorBun: bun,
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
      constructorItems: [ingredient1, ingredient2],
    };
    const movedArray = [ingredient2, ingredient1];
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

