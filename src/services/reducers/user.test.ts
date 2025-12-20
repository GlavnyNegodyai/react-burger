import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_REMOVE,
} from "../actions/user";

import { initialState, userReducer } from "./user";

describe("userReducer", () => {
  it("Должен начать загрузку", () => {
    const action = {type: USER_REQUEST};
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        isUserLoading: true
    });
  });

  it("Должен закончить загрузку и передать юзера от сервера", () => {
    const user = {email: 'some@random.email', name: 'XxDreadful_Nickname2007xX'};
    const action = {type: USER_SUCCESS, payload: user};
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        user: action.payload,
        isUserLoading: false,
    });
  });

  it("Должен закончить загрузку и передать ошибку", () => {
    const action = {type: USER_FAIL, payload: 'SOME_ERROR'};
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        isUserLoading: false,
        userError: action.payload
    });
  });

  it("Должен удалить юзера", () => {
    const action = {type: USER_REMOVE};
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        user: null
    });
  });

    it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
        const action = { type: "UNKNOWN_ACTION" } as any;
        const newState = userReducer(initialState, action);
        expect(newState).toEqual(initialState);
    });
});
