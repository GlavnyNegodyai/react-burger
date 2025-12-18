import {
  BURGER_INGREDIENTS_FETCH_FAIL,
  BURGER_INGREDIENTS_FETCH_SUCCESS,
  BURGER_INGREDIENTS_FETCH_REQUEST,
} from "../actions/burger-ingredients";
import { initialState, ingredientsReducer } from "./burger-ingredients";

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

describe("ingredientsReducer", () => {
  it("Должен сделать fetchLoading: true", () => {
    const action = { type: BURGER_INGREDIENTS_FETCH_REQUEST };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      fetchLoading: true,
      fetchError: null,
      ingredients: [],
    });
  });
  it("Должен сделать fetchLoading: false и передать ошибку", () => {
    const action = {
      type: BURGER_INGREDIENTS_FETCH_FAIL,
      payload: "unknown_error",
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      fetchLoading: false,
      fetchError: action.payload,
    });
  });
  it("Должен сделать fetchLoading: false, обнулить ошибку и передать ингредиенты", () => {
    const ingrPayload = [ingredient1, ingredient2, bun];
    const action = {
      type: BURGER_INGREDIENTS_FETCH_SUCCESS,
      payload: ingrPayload,
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      fetchLoading: false,
      fetchError: null,
      ingredients: action.payload,
    });
  });
  it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

