import {
  FORGOT_PASSWORD_POST_REQUEST,
  FORGOT_PASSWORD_POST_SUCCESS,
  FORGOT_PASSWORD_POST_FAIL,
} from "../actions/forgot-password";

import { initialState, forgotPasswordReducer } from "./forgot-password";

describe("forgotPasswordReducer", () => {
  it("Должен сделать isForgotPasswordLoading: true, обнулить ошибки и ответ от сервера", () => {
    const action = { type: FORGOT_PASSWORD_POST_REQUEST };
    const newState = forgotPasswordReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      isForgotPasswordLoading: true,
      forgotPasswordError: null,
      forgotPasswordServerReply: "",
    });
  });
  it("Должен сделать isForgotPasswordLoading: false и передать ошибку", () => {
    const action = {
      type: FORGOT_PASSWORD_POST_FAIL,
      payload: "unknown_error",
    };
    const newState = forgotPasswordReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      forgotPasswordError: action.payload,
      isForgotPasswordLoading: false,
    });
  });
  it("Должен сделать isForgotPasswordLoading: false, обнулить ошибку и передать ответ сервера", () => {
    const ingrPayload = "Код восстановления отправлен на указанный имейл";
    const action = {
      type: FORGOT_PASSWORD_POST_SUCCESS,
      payload: ingrPayload,
    };
    const newState = forgotPasswordReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,

      isForgotPasswordLoading: false,
      forgotPasswordServerReply: action.payload,
    });
  });
  it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = forgotPasswordReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

