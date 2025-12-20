import {
  BURGER_INGREDIENTS_FETCH_FAIL,
  BURGER_INGREDIENTS_FETCH_SUCCESS,
  BURGER_INGREDIENTS_FETCH_REQUEST,
} from "../actions/burger-ingredients";
import { initialState, ingredientsReducer } from "./burger-ingredients";

import { ingredient1, ingredient2, bun } from "../../jest-constants/reducer-jest-constants";

describe("ingredientsReducer", () => {
  it("Должен сделать fetchLoading: true", () => {
    const action = { type: BURGER_INGREDIENTS_FETCH_REQUEST };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      fetchLoading: true,
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

