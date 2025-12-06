import { TfeedResponse } from "../types/data";

export const ALL_FEED_WS_INIT: 'ALL_FEED_WS_INIT' = 'ALL_FEED_WS_INIT';
export const ALL_FEED_WS_CLOSE: 'ALL_FEED_WS_CLOSE' = 'ALL_FEED_WS_CLOSE';
export const ALL_FEED_WS_SEND: 'ALL_FEED_WS_SEND' = 'ALL_FEED_WS_SEND';
export const ALL_FEED_WS_OPEN: 'ALL_FEED_WS_OPEN' = 'ALL_FEED_WS_OPEN';
export const ALL_FEED_WS_ERROR: 'ALL_FEED_WS_ERROR' = 'ALL_FEED_WS_ERROR';
export const ALL_FEED_WS_MESSAGE: 'ALL_FEED_WS_MESSAGE' = 'ALL_FEED_WS_MESSAGE';

export const allFeedWsActions = {
    wsInit: ALL_FEED_WS_INIT,
    wsClose: ALL_FEED_WS_CLOSE,
    wsSend: ALL_FEED_WS_SEND,
    onOpen: ALL_FEED_WS_OPEN,
    onClose: ALL_FEED_WS_CLOSE,
    onError: ALL_FEED_WS_ERROR,
    onMessage: ALL_FEED_WS_MESSAGE
};

type TallFeedWsInitAction = {
    readonly type: typeof ALL_FEED_WS_INIT;
};

type TallFeedWsClose = {
    readonly type: typeof ALL_FEED_WS_CLOSE;
};

type TallFeedWsSend = {
    readonly type: typeof ALL_FEED_WS_SEND;
};

type TallFeedWsOpen = {
    readonly type: typeof ALL_FEED_WS_OPEN;
};

type TallFeedWsError = {
    readonly type: typeof ALL_FEED_WS_ERROR;
    readonly payload: string;
};

type TallFeedWsMessage = {
    readonly type: typeof ALL_FEED_WS_MESSAGE;
    readonly payload: TfeedResponse;
};

export type TallFeedWsActions =
  | TallFeedWsInitAction
  | TallFeedWsClose
  | TallFeedWsSend
  | TallFeedWsOpen
  | TallFeedWsError
  | TallFeedWsMessage;