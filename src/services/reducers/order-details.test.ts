import {
    CONSTRUCTOR_SEND_ORDER_REQUEST,
    CONSTRUCTOR_SEND_ORDER_FAIL,
    CONSTRUCTOR_SEND_ORDER_SUCCESS
} from '../actions/order-details';

import { initialState, orderReducer } from "./order-details";

describe("orderReducer", () => {
  it("Должен начать загрузку и обнулить ошибку", () => {
    const action = {type: CONSTRUCTOR_SEND_ORDER_REQUEST};
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        sendOrderLoading: true,
        sendOrderError: false
    });
  });
  it("Должен завершить загрузку и дать ошибку в sendOrderError", () => {
    const action = {type: CONSTRUCTOR_SEND_ORDER_FAIL, payload: 'SOME_ERROR'};
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        sendOrderLoading: false,
        sendOrderError: action.payload,
        orderDetails: null
    });
  });
  it("Должен завершить загрузку, обнулить ошибку и передать номер заказа в orderDetails", () => {
    const action = {type: CONSTRUCTOR_SEND_ORDER_SUCCESS, payload: 100};
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual({
        ...initialState,
        sendOrderLoading: false,
        sendOrderError: null,
        orderDetails: action.payload
    });
  });
  it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

