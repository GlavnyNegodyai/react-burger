import { TfeedResponse } from "../types/data";

export const USER_FEED_WS_INIT: 'USER_FEED_WS_INIT' = 'USER_FEED_WS_INIT';
export const USER_FEED_WS_CLOSE: 'USER_FEED_WS_CLOSE' = 'USER_FEED_WS_CLOSE';
export const USER_FEED_WS_SEND: 'USER_FEED_WS_SEND' = 'USER_FEED_WS_SEND';
export const USER_FEED_WS_OPEN: 'USER_FEED_WS_OPEN' = 'USER_FEED_WS_OPEN';
export const USER_FEED_WS_ERROR: 'USER_FEED_WS_ERROR' = 'USER_FEED_WS_ERROR';
export const USER_FEED_WS_MESSAGE: 'USER_FEED_WS_MESSAGE' = 'USER_FEED_WS_MESSAGE';

export const userFeedWsActions = {
    wsInit: USER_FEED_WS_INIT,
    wsClose: USER_FEED_WS_CLOSE,
    wsSend: USER_FEED_WS_SEND,
    onOpen: USER_FEED_WS_OPEN,
    onClose: USER_FEED_WS_CLOSE,
    onError: USER_FEED_WS_ERROR,
    onMessage: USER_FEED_WS_MESSAGE
};

type TuserFeedWsInitAction = {
    readonly type: typeof USER_FEED_WS_INIT;
};

type TuserFeedWsClose = {
    readonly type: typeof USER_FEED_WS_CLOSE;
};

type TuserFeedWsSend = {
    readonly type: typeof USER_FEED_WS_SEND;
};

type TuserFeedWsOpen = {
    readonly type: typeof USER_FEED_WS_OPEN;
};

type TuserFeedWsError = {
    readonly type: typeof USER_FEED_WS_ERROR;
    readonly payload: string;
};

type TuserFeedWsMessage = {
    readonly type: typeof USER_FEED_WS_MESSAGE;
    readonly payload: TfeedResponse;
};

export type TuserFeedWsActions =
  | TuserFeedWsInitAction
  | TuserFeedWsClose
  | TuserFeedWsSend
  | TuserFeedWsOpen
  | TuserFeedWsError
  | TuserFeedWsMessage;