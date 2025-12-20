import { userFeedReducer, initialState } from "./user-orders-feed";
import {
  USER_FEED_WS_INIT,
  USER_FEED_WS_ERROR,
  USER_FEED_WS_OPEN,
  USER_FEED_WS_CLOSE,
  USER_FEED_WS_MESSAGE,
  USER_FEED_WS_SEND,
} from "../actions/user-orders-feed";

import { testOrder } from "../../jest-constants/reducer-jest-constants";

describe("userFeedReducer", () => {
  it("Должен вернуть state c очищенным wsError", () => {
    const action = { type: USER_FEED_WS_INIT };
    const prevState: typeof initialState = {
      ...initialState,
      wsError: "Some error",
      wsConnected: false,
      orders: [
        testOrder,
      ],
      total: 100,
      totalToday: 10,
    };
    const newState = userFeedReducer(prevState, action);

    expect(newState).toEqual({
      ...prevState,
      wsError: null,
    });
  });

  it("Должен добавить ошибку в wsError", () => {
    const errorPayload = "Error 404";
    const action = { type: USER_FEED_WS_ERROR, payload: errorPayload };
    const newState = userFeedReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      wsError: errorPayload,
    });
  });

  it("Должен очистить wsError и сделать wsConnected=true", () => {
    const action = { type: USER_FEED_WS_OPEN };
    const newState = userFeedReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      wsError: null,
      wsConnected: true,
    });
  });

  it("Должен сделать wsConnected=false", () => {
    const action = { type: USER_FEED_WS_CLOSE };
    const newState = userFeedReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("Должен обновляет orders, total, totalToday", () => {
    const messagePayload = {success: true, orders: [], total: 10, totalToday: 11};
    const action = { type: USER_FEED_WS_MESSAGE, payload: messagePayload };
    const newState = userFeedReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      orders: [],
      total: 10,
      totalToday: 11,
    });
  });


  it("Ничего не делает (пока что)", () => {
    const action = { type: USER_FEED_WS_SEND} as any;
    const newState = userFeedReducer(initialState, action);
    expect(newState).toEqual(
      initialState
    );
  });

  it("Ничего не делает", () => {
    const action = { type: 'UNKNOWN_ROGUE_ACTION'} as any;
    const newState = userFeedReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });


});
