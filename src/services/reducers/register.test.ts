import {
    REGISTER_POST_REQUEST,
    REGISTER_POST_SUCCESS,
    REGISTER_POST_FAIL
} from '../actions/register';

import { initialState, registerReducer } from "./register";

describe("registerReducer", () => {
  it("Начать загрузку и обнулить ошибку", () => {
    const action = {type: REGISTER_POST_REQUEST};
    const newState = registerReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        isRegisterLoading: true,
        registerError: null,
    });
  });
  it("Завершить загрузку и передать ошибку", () => {
    const action = {type: REGISTER_POST_FAIL, payload: 'SOME_ERROR'};
    const newState = registerReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        registerError: action.payload,
        isRegisterLoading: false
    });
  });
  it("Завершить загрузку", () => {
    const action = {type: REGISTER_POST_SUCCESS};
    const newState = registerReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        isRegisterLoading: false,
    });
  });
  it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = registerReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

