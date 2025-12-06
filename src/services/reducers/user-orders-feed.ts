import { TfeedResponse } from '../types/data';

import {
    USER_FEED_WS_SEND,
    USER_FEED_WS_CLOSE,
    USER_FEED_WS_ERROR,
    USER_FEED_WS_INIT,
    USER_FEED_WS_MESSAGE,
    USER_FEED_WS_OPEN,
    TuserFeedWsActions
} from '../actions/user-orders-feed';

type TinitialState = {
    wsError: string | null;
    wsConnected: boolean;
    orders: TfeedResponse | [];
    total: number;
    totalToday: number;
};

const initialState: TinitialState = {
    wsError: null,
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
};

export function userFeedReducer(state = initialState, action: TuserFeedWsActions){
    switch(action.type){
        case USER_FEED_WS_INIT: {
            return{
                ...state,
                error: null
            }
        }
        case USER_FEED_WS_ERROR: {
            return{
                ...state, 
                error: action.payload
            }
        }
        case USER_FEED_WS_OPEN: {
            return{
                ...state, 
                wsConnected: true,
                error: null
            }
        }
        case USER_FEED_WS_CLOSE: {
            return{
                ...state,
                wsConnected: false,
                orders: []
            }
        }
        case USER_FEED_WS_MESSAGE: {
            return{
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }
        case USER_FEED_WS_SEND: 
            return state;
        
        default: 
            return state;
    }   
}