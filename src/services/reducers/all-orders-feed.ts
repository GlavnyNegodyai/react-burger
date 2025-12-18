import { TfeedResponse, TFeedOrder } from '../types/data';

import {
    ALL_FEED_WS_SEND,
    ALL_FEED_WS_CLOSE,
    ALL_FEED_WS_ERROR,
    ALL_FEED_WS_INIT,
    ALL_FEED_WS_MESSAGE,
    ALL_FEED_WS_OPEN
} from '../actions/all-orders-feed';

import { TallFeedWsActions } from '../actions/all-orders-feed';

type TinitialState = {
    wsError: string;
    wsConnected: boolean;
    orders: TFeedOrder[] | [];
    total: number;
    totalToday: number;
};

export const initialState: TinitialState = {
    wsError: '',
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
};

export function allFeedReducer(state = initialState, action: TallFeedWsActions ){
    switch(action.type){
        case ALL_FEED_WS_INIT: {
            return{
                ...state,
                wsError: ''
            }
        }
        case ALL_FEED_WS_ERROR: {
            return{
                ...state, 
                wsError: action.payload
            }
        }
        case ALL_FEED_WS_OPEN: {
            return{
                ...state, 
                wsConnected: true,
                wsError: ''
            }
        }
        case ALL_FEED_WS_CLOSE: {
            return{
                ...state,
                wsConnected: false,
            }
        }
        case ALL_FEED_WS_MESSAGE: {
            return{
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }
        case ALL_FEED_WS_SEND: 
            return{
                ...state
            }
        
        default: 
            return state;
    }   
}