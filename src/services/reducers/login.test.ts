import {
    LOGIN_POST_REQUEST,
    LOGIN_POST_SUCCESS,
    LOGIN_POST_FAIL
} from '../actions/login';

import { initialState, loginReducer } from "./login";

describe("loginReducer", () => {
  it("Должен сделать isLoginLoading: true, обнулить ошибки", () => {
    const action = { type: LOGIN_POST_REQUEST };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
        isLoginLoading: true,
        loginError: false,
    });
  });
  it("Должен сделать isLoginLoading: false и передать loginError: true", () => {
    const action = {
      type: LOGIN_POST_FAIL,
    };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
    loginError: true,
    isLoginLoading: false
    });
  });
  it("Должен сделать isLoginLoading: false", () => {
    const action = {
      type: LOGIN_POST_SUCCESS,
    };
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
        isLoginLoading: false,
    });
  });
  it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = loginReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
