import {
  RESET_PASSWORD_POST_REQUEST,
  RESET_PASSWORD_POST_SUCCESS,
  RESET_PASSWORD_POST_FAIL,
} from "../actions/reset-password";

import { initialState, resetPasswordReducer } from "./reset-password";

describe("resetPasswordReducer", () => {
  it("Должен начать загрузку и обнулить ошибку", () => {
    const action = { type: RESET_PASSWORD_POST_REQUEST };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      isResetPasswordLoading: true,
      resetPasswordError: null,
    });
  });

  it("Должен завершить загрузку и передать ошибку", () => {
    const action = { type: RESET_PASSWORD_POST_FAIL, payload: "SOME_ERROR" };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      resetPasswordError: action.payload,
      isResetPasswordLoading: false,
    });
  });

  it("Должен завершить загрузку", () => {
    const action = { type: RESET_PASSWORD_POST_SUCCESS };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      isResetPasswordLoading: false,
    });
  });

  it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
