import { allFeedReducer, initialState } from "./all-orders-feed";
import {
  ALL_FEED_WS_INIT,
  ALL_FEED_WS_ERROR,
  ALL_FEED_WS_OPEN,
  ALL_FEED_WS_CLOSE,
  ALL_FEED_WS_MESSAGE,
  ALL_FEED_WS_SEND,
} from "../actions/all-orders-feed";

import { testOrder } from "../../jest-constants/reducer-jest-constants";

describe("allFeedReducer", () => {
  it("Должен вернуть state c очищенным wsError", () => {
    const action = { type: ALL_FEED_WS_INIT };
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
    const newState = allFeedReducer(prevState, action);

    expect(newState).toEqual({
      ...prevState,
      wsError: "",
    });
  });

  it("Должен добавить ошибку в wsError", () => {
    const errorPayload = "Error 404";
    const action = { type: ALL_FEED_WS_ERROR, payload: errorPayload };
    const newState = allFeedReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      wsError: errorPayload,
    });
  });

  it("Должен очистить wsError и сделать wsConnected=true", () => {
    const action = { type: ALL_FEED_WS_OPEN };
    const newState = allFeedReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      wsError: "",
      wsConnected: true,
    });
  });

  it("Должен сделать wsConnected=false", () => {
    const action = { type: ALL_FEED_WS_CLOSE };
    const newState = allFeedReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("Должен обновляет orders, total, totalToday", () => {
    const messagePayload = {success: true, orders: [], total: 10, totalToday: 11};
    const action = { type: ALL_FEED_WS_MESSAGE, payload: messagePayload };
    const newState = allFeedReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      orders: [],
      total: 10,
      totalToday: 11,
    });
  });


  it("Ничего не делает (пока что)", () => {
    const action = { type: ALL_FEED_WS_SEND};
    const newState = allFeedReducer(initialState, action);

    expect(newState).toEqual(
      initialState
    );
  });

  it("Ничего не делает", () => {
    const action = { type: 'UNKNOWN_ROGUE_ACTION'};
    const newState = allFeedReducer(initialState, action as any);

    expect(newState).toBe(
      initialState
    );
  });
});

