import {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS
} from '../actions/order-composition';

import { initialState, orderCompositionReducer} from './order-composition';

import { testOrder as order } from "../../jest-constants/reducer-jest-constants";

describe("orderCompositionReducer", () => {
  it("Должен сделать orderDetailsLoading: true, обнулить ошибки", () => {
    const action = { type: ORDER_DETAILS_REQUEST };
    const newState = orderCompositionReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
        orderDetailsLoading: true,
        orderDetailsError: false
    });
  });
  it("Должен завершить загрузку, сбросить детали заказа и установить orderDetailsError: true", () => {
    const action = {
      type: ORDER_DETAILS_FAIL,
    };
    const newState = orderCompositionReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
        orderDetailsLoading: false,
        orderDetailsError: true,
        orderDetails: null
    });
  });
  it("Должен сделать orderDetailsLoading: false, обнулить ошибку и передать ответ с заказом сервера", () => {
    const action = {
      type: ORDER_DETAILS_SUCCESS,
      payload: order
    };
    const newState = orderCompositionReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
        orderDetailsLoading: false,
        orderDetailsError: false,
        orderDetails: action.payload
    });
  });
  it("Должен вернуть текущий стейт, если тип экшена неизвестен", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = orderCompositionReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

